export async function getTopHeadlines(country = 'in') {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    
    if (!apiKey) {
      throw new Error('NEWS_API_KEY not configured');
    }
    
    // Fetch breaking news for the selected country using NewsData.io
    const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=${country}&language=en`;
    
    console.log(`[NEWS] Fetching breaking news for country: ${country}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`NewsData.io error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    
    // Check for API-level errors
    if (data.status === 'error') {
      throw new Error(data.results?.message || 'Failed to fetch news');
    }
    
    if (data.status !== 'success') {
      throw new Error('Unexpected API response status');
    }
    
    console.log(`[NEWS] Successfully fetched ${data.results?.length || 0} articles for country: ${country}`);
    
    // Transform NewsData.io response to standardized format
    return {
      success: true,
      articles: (data.results || []).map(article => ({
        title: article.title || 'No title available',
        description: article.description || article.content || 'No description available',
        url: article.link || '#',
        urlToImage: article.image_url || null,
        publishedAt: article.pubDate || new Date().toISOString(),
        author: article.creator ? article.creator.join(', ') : null,
        source: article.source_name || article.source_id || 'Unknown Source'
      }))
    };
  } catch (error) {
    console.error('[NEWS] Error fetching news:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to fetch news articles'
    };
  }
}
