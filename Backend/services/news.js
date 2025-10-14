export async function getTopHeadlines() {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch news');
    }
    
    console.log(`[NEWS] Fetched ${data.articles.length} articles`);
    
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
