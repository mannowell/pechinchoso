// services/apiService.js
// Serviço unificado de ofertas — APIs gratuitas reais

// ──────────────────────────────────────────────────────────────
// 1. CheapShark API — Jogos e tecnologia com desconto (gratuita)
// ──────────────────────────────────────────────────────────────
export const fetchCheapSharkDeals = async () => {
  try {
    const response = await fetch(
      'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=15&sortBy=savings'
    );
    const data = await response.json();

    return data.slice(0, 10).map(deal => ({
      id: `cheapshark-${deal.dealID}`,
      title: deal.title,
      price: `€${parseFloat(deal.salePrice).toFixed(2)}`,
      normalPrice: `€${parseFloat(deal.normalPrice).toFixed(2)}`,
      description: `Desconto real de ${Math.round(deal.savings)}% em tecnologia/jogos.`,
      link: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
      image: deal.thumb || '🎮',
      source: 'CheapShark',
      savings: Math.round(deal.savings),
      category: 'tecnologia',
    }));
  } catch (error) {
    console.warn('CheapShark API Error:', error.message);
    return [];
  }
};

// ──────────────────────────────────────────────────────────────
// 2. Open Food Facts — Produtos alimentares com avaliação
// ──────────────────────────────────────────────────────────────
export const fetchFoodDeals = async () => {
  try {
    const response = await fetch(
      'https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=countries&tag_contains_0=contains&tag_0=portugal&sort_by=unique_scans_n&page_size=8&json=true'
    );
    const data = await response.json();

    if (!data.products) return [];

    return data.products
      .filter(p => p.product_name && p.nutriscore_grade)
      .slice(0, 6)
      .map((p, i) => ({
        id: `food-${i}-${p.code}`,
        title: p.product_name,
        price: `Nutriscore: ${(p.nutriscore_grade || '?').toUpperCase()}`,
        normalPrice: null,
        description: `${p.brands || 'Marca desconhecida'} • Disponível em Portugal`,
        link: `https://world.openfoodfacts.org/product/${p.code}`,
        image: p.image_thumb_url || '🥗',
        source: 'Open Food Facts',
        savings: 0,
        category: 'mercado',
      }));
  } catch (error) {
    console.warn('Open Food Facts Error:', error.message);
    return [];
  }
};

// ──────────────────────────────────────────────────────────────
// 3. RSS Pplware — Artigos de tecnologia e promoções em PT
// ──────────────────────────────────────────────────────────────
export const fetchRSSDeals = async () => {
  try {
    const response = await fetch('https://pplware.sapo.pt/feed/', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const xml = await response.text();

    const deals = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;
    let count = 0;

    while ((match = itemRegex.exec(xml)) !== null && count < 12) {
      const itemXml = match[1];
      
      const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/i) || itemXml.match(/<title>(.*?)<\/title>/i);
      const linkMatch = itemXml.match(/<link>(.*?)<\/link>/i);
      const descMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/i) || itemXml.match(/<description>(.*?)<\/description>/i);
      const dateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/i);

      if (!titleMatch || !linkMatch) continue;

      const title = titleMatch[1];
      const link = linkMatch[1];
      const desc = descMatch ? descMatch[1].replace(/<[^>]*>?/gm, '').substring(0, 120) : '';
      const pubDate = dateMatch ? dateMatch[1] : '';

      const isPromotion = ['promo', 'desconto', 'grátis', 'oferta', 'gratis', 'free', 'barato', 'black friday'].some(
        kw => title.toLowerCase().includes(kw)
      );

      if (isPromotion) {
        deals.push({
          id: `rss-${count}`,
          title: title.length > 70 ? title.substring(0, 70) + '...' : title,
          price: 'Novidade PT',
          normalPrice: null,
          description: desc,
          link,
          image: '🗞️',
          source: 'Pplware',
          savings: 0,
          category: 'noticias',
          date: pubDate,
        });
      }
      count++;
    }

    return deals.slice(0, 5);
  } catch (error) {
    console.warn('RSS Feed Error:', error.message);
    return [];
  }
};

// ──────────────────────────────────────────────────────────────
// 4. ExchangeRate API — Taxa de câmbio EUR/BRL em tempo real
// ──────────────────────────────────────────────────────────────
export const fetchExchangeRate = async () => {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
    const data = await response.json();
    return {
      eurToBrl: data.rates?.BRL?.toFixed(2) || '5.40',
      eurToUsd: data.rates?.USD?.toFixed(2) || '1.09',
      eurToGbp: data.rates?.GBP?.toFixed(2) || '0.86',
      updatedAt: new Date(data.time_last_updated * 1000).toLocaleString('pt-PT'),
    };
  } catch (error) {
    return { eurToBrl: '5.40', eurToUsd: '1.09', eurToGbp: '0.86', updatedAt: 'N/A' };
  }
};

// ──────────────────────────────────────────────────────────────
// 5. Master Resolver — Combina APIs por categoria
// ──────────────────────────────────────────────────────────────
export const getUnifiedDeals = async (category = 'geral') => {
  if (category === 'tecnologia' || category === 'eletronicos') {
    return await fetchCheapSharkDeals();
  }

  if (category === 'mercado' || category === 'alimentar') {
    return await fetchFoodDeals();
  }

  if (category === 'noticias' || category === 'novidades') {
    return await fetchRSSDeals();
  }

  // Geral: mistura de tudo
  const [tech, food, news] = await Promise.all([
    fetchCheapSharkDeals(),
    fetchFoodDeals(),
    fetchRSSDeals(),
  ]);

  return [
    ...tech.slice(0, 4),
    ...food.slice(0, 3),
    ...news.slice(0, 3),
  ];
};
