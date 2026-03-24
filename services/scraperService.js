// services/scraperService.js

/**
 * Real-time Web Scraper using DuckDuckGo Lite (No CORS issues in proxy/cloud)
 * Optimized for Portuguese retailers and price extraction without native Cheerio dependencies.
 */
export const scrapePromotions = async (queryTerm, type = 'promo') => {
  try {
    // 1. Refine the query for better results in Portugal
    const cleanTerm = queryTerm.toLowerCase();
    const isStore = ['continente', 'pingo doce', 'auchan', 'mercadona', 'aldi', 'intermarche', 'lidl', 'worten', 'fnac', 'el corte ingles'].some(s => cleanTerm.includes(s));
    
    let finalQuery = queryTerm;
    if (isStore && !cleanTerm.includes('pt')) {
        finalQuery = `${queryTerm} Portugal promoções saldos`;
    } else if (!isStore) {
        finalQuery = `${queryTerm} melhores preços Portugal 2026`;
    }

    const url = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(finalQuery)}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    const htmlString = await response.text();
    const results = [];

    // DuckDuckGo Lite result rows using Regex instead of Cheerio to avoid Metro bundler crashes
    const regex = /<tr[^>]*>.*?<td class='result-snippet'[^>]*>(.*?)<\/td>.*?<\/tr>/gi;
    
    // Simplificado: extrator de links e títulos
    const linkRegex = /<a rel="nofollow" href="([^"]+)" class="result-url"([^>]*)>(.*?)<\/a>/gi;
    
    let match;
    let i = 0;
    while ((match = linkRegex.exec(htmlString)) !== null && i < 12) {
      const rawLink = match[1];
      const titleRaw = match[3];
      const title = titleRaw.replace(/<[^>]*>?/gm, '').trim();
      
      // Procurando o snippet mais próximo (estimativa segura por index)
      const snippetSection = htmlString.substring(match.index, match.index + 800);
      const snippetMatch = snippetSection.match(/<td class='result-snippet'[^>]*>(.*?)<\/td>/i);
      const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]*>?/gm, '').trim() : '';
      
      if (title && rawLink && !rawLink.includes('duckduckgo.com')) {
          // 2. Advanced Price / Discount Extraction
          const priceRegex = /([\d,.]+\s?€)|(-?\d+%)|(\d+\s?€)|(Grátis)/gi;
          const matches = (title + ' ' + snippet).match(priceRegex);
          const price = matches ? matches[0] : 'Ver Preço';

          // 3. Clean up the link
          let link = rawLink;
          if (link.startsWith('//')) link = `https:${link}`;
          if (!link.startsWith('http')) link = `https://${link}`;

          results.push({
            id: `scrape-${i}-${Date.now()}`,
            title: title.length > 75 ? title.substring(0, 75) + '...' : title,
            price: price,
            description: snippet.length > 120 ? snippet.substring(0, 120) + '...' : snippet,
            link: link,
            image: getStoreEmoji(title + ' ' + queryTerm),
            source: extractDomain(link),
            savings: extractSavings(title + ' ' + snippet)
          });
      }
      i++;
    }

    // 4. Filter and Sort
    const uniqueResults = Array.from(new Map(results.map(item => [item.link, item])).values());
    
    if (uniqueResults.length > 0) {
        return uniqueResults.slice(0, 10);
    }

    return getFallbackData(queryTerm);

  } catch (error) {
    console.warn('Scraping service failed:', error.message);
    return getFallbackData(queryTerm);
  }
};

const extractDomain = (url) => {
    try {
        const domain = url.split('/')[2].replace('www.', '');
        return domain.charAt(0).toUpperCase() + domain.slice(1);
    } catch {
        return 'Oferta Externa';
    }
};

const extractSavings = (text) => {
    const match = text.match(/(-?\d+)%/);
    return match ? Math.abs(parseInt(match[1])) : 0;
};

const getStoreEmoji = (text) => {
    const t = text.toLowerCase();
    if (t.includes('continente') || t.includes('pingo') || t.includes('supermercado') || t.includes('lidl')) return '🛒';
    if (t.includes('worten') || t.includes('fnac') || t.includes('apple') || t.includes('telemovel') || t.includes('laptop')) return '💻';
    if (t.includes('zara') || t.includes('h&m') || t.includes('roupa') || t.includes('moda')) return '👕';
    if (t.includes('voo') || t.includes('viagem') || t.includes('hotel') || t.includes('ryanair')) return '✈️';
    if (t.includes('comida') || t.includes('restaurante') || t.includes('fork')) return '🍽️';
    if (t.includes('farmacia') || t.includes('saude') || t.includes('bem-estar')) return '💊';
    return '🛍️';
};

const getFallbackData = (storeName) => {
    return [
      { 
        id: 'fallback-1', 
        title: `Procurar pechinchas em ${storeName}`, 
        price: 'Ver Ofertas', 
        description: 'Clique para realizar uma busca manual no portal de descontos de Portugal.', 
        link: `https://www.google.pt/search?q=${encodeURIComponent(storeName + ' promoções Portugal')}`,
        image: '🕵️‍♂️',
        source: 'Google PT',
        savings: 0
      }
    ];
};
