// services/scraperService.js
import cheerio from 'react-native-cheerio';

export const scrapePromotions = async (storeName, type = 'promo') => {
  try {
    const isSupermarket = ['continente', 'pingo doce', 'auchan', 'mercadona', 'aldi', 'intermarche'].includes(storeName.toLowerCase());
    const isCategory = ['Transportes', 'Mercado', 'Roupas', 'Eletrónicos', 'Casa', 'Saúde', 'Voos'].some(c => storeName.includes(c));
    
    let queryTerm = 'promoções OR descontos OR saldos';
    let siteFilter = `site:${storeName.toLowerCase()}.pt `;
    
    if (isCategory) {
        siteFilter = ''; 
        queryTerm = `"${storeName}" melhores promoções Portugal 2026`;
    } else if (type === 'folheto' || isSupermarket) {
        queryTerm = 'folheto OR "poupa mais" OR "desconto direto" OR vouchers';
    }

    const query = encodeURIComponent(`${siteFilter}${queryTerm}`);
    const url = `https://lite.duckduckgo.com/lite/?q=${query}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const results = [];

    // DuckDuckGo Lite uses a table structure with .result-link and .result-snippet
    $('.result-link').each((i, el) => {
      if (i >= 10) return;

      const linkEl = $(el);
      const title = linkEl.text().trim();
      const link = linkEl.attr('href');
      
      // Find the snippet which is usually in the next row or sibling
      const snippet = linkEl.closest('tr').next().find('.result-snippet').text().trim();
      
      if (title && link && !link.includes('duckduckgo.com')) {
          // Extract price or discount
          const priceMatch = title.match(/[\d,.]+\s?€/) || snippet.match(/[\d,.]+\s?€/) || title.match(/-?[\d]+%/);
          const price = priceMatch ? priceMatch[0] : 'Ver Oferta';

          results.push({
            id: `real-${i}-${Date.now()}`,
            title: title.length > 60 ? title.substring(0, 60) + '...' : title,
            price: price,
            description: snippet.substring(0, 100),
            link: link.startsWith('http') ? link : `https:${link}`,
            image: getStoreIcon(storeName)
          });
      }
    });

    if (results.length > 0) {
        // Remove duplicates and return
        return Array.from(new Map(results.map(item => [item.link, item])).values()).slice(0, 8);
    }

    return getFallbackData(storeName);

  } catch (error) {
    console.warn('Scraping error, using fallback:', error.message);
    return getFallbackData(storeName);
  }
};

const getStoreIcon = (storeName) => {
    const icons = {
        'transportes': '✈️', 'voos': '✈️',
        'pingo doce': '🛒', 'continente': '🛒',
        'zara': '👕', 'moda': '👕',
        'eletronicos': '💻', 'worten': '💻',
        'saúde': '💊', 'farmacia': '💊'
    };
    for(const key in icons) {
        if(storeName.toLowerCase().includes(key)) return icons[key];
    }
    return '🛍️';
}

const getFallbackData = (storeName) => {
    return [
      { 
        id: 'f1', 
        title: `Ver todas as ofertas em ${storeName}`, 
        price: '🔥 Destaque', 
        description: 'Clique para abrir o portal oficial de descontos.', 
        link: `https://www.google.pt/search?q=${encodeURIComponent(storeName + ' promoções')}`,
        image: getStoreIcon(storeName)
      }
    ];
}
