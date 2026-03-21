// services/apiService.js
import cheerio from 'react-native-cheerio';

/**
 * CheapShark API - Real-time Game & Tech Deals (Free)
 */
export const fetchCheapSharkDeals = async () => {
  try {
    const response = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20');
    const data = await response.json();
    
    return data.slice(0, 10).map(deal => ({
      id: `cheapshark-${deal.dealID}`,
      title: deal.title,
      price: `${deal.salePrice}€`,
      description: `Desconto real de ${Math.round(deal.savings)}% em tecnologia/jogos.`,
      link: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
      image: deal.thumb,
      source: 'CheapShark'
    }));
  } catch (error) {
    console.error('CheapShark API Error:', error);
    return [];
  }
};

/**
 * RSS Feed Parser - Fetching latest news/deals from Portuguese blogs
 * We use cheerio to parse the XML feed
 */
export const fetchRSSDeals = async () => {
  try {
    // Example: Pplware (Technology/Deals in Portugal) or similar
    const response = await fetch('https://pplware.sapo.pt/feed/');
    const xml = await response.text();
    const $ = cheerio.load(xml, { xmlMode: true });
    
    const deals = [];
    $('item').each((i, el) => {
      if (i >= 8) return;
      
      const title = $(el).find('title').text();
      const link = $(el).find('link').text();
      const desc = $(el).find('description').text().replace(/<[^>]*>?/gm, '').substring(0, 100);
      
      if (title.toLowerCase().includes('promo') || title.toLowerCase().includes('desconto')) {
        deals.push({
          id: `rss-${i}`,
          title: title,
          price: 'Novidade',
          description: desc,
          link: link,
          image: '🗞️',
          source: 'Notícias PT'
        });
      }
    });
    
    return deals;
  } catch (error) {
    console.error('RSS Feed Error:', error);
    return [];
  }
};

/**
 * Master Resolver - Combines Scraping with real APIs
 */
export const getUnifiedDeals = async (category = 'geral') => {
  if (category === 'eletronicos' || category === 'tecnologia') {
    const shark = await fetchCheapSharkDeals();
    return shark;
  }
  
  if (category === 'noticias' || category === 'novidades') {
    return await fetchRSSDeals();
  }
  
  // Default: return a mix of both if general
  const [shark, rss] = await Promise.all([fetchCheapSharkDeals(), fetchRSSDeals()]);
  return [...shark.slice(0, 5), ...rss.slice(0, 5)];
};
