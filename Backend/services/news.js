export async function getTopHeadlines(source = 'tech') {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    
    // Different URL patterns for different sources
    let url;
    if (source === 'tech') {
      url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;
    } else if (source === 'apple') {
      url = `https://newsapi.org/v2/everything?q=apple&from=2025-10-13&to=2025-10-13&sortBy=popularity&apiKey=${apiKey}`;
    } else if (source === 'tesla') {
      url = `https://newsapi.org/v2/everything?q=tesla&from=2025-09-14&sortBy=publishedAt&apiKey=${apiKey}`;
    } else if (source === 'business') {
      url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
    } else if (source === 'jane') {
      url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch news');
    }
    
    console.log(`[NEWS] Fetched ${data.articles.length} articles for source: ${source}`);
    
    return {
      success: true,
      articles: data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        author: article.author,
        source: article.source.name
      }))
    };
  } catch (error) {
    console.error('[NEWS] Error fetching news:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
