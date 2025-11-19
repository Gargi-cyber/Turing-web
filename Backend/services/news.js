export async function getTopHeadlines(country = 'in') {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    
    if (!apiKey) {
      console.error('[NEWS] NEWS_API_KEY not configured');
      throw new Error('NEWS_API_KEY not configured');
    }
    
    const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=${country}&language=en`;
    
    console.log(`[NEWS] Fetching breaking news for country: ${country}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[NEWS] API Error Response:`, errorText);
      throw new Error(`NewsData.io error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'error') {
      console.error('[NEWS] API returned error:', data);
      throw new Error(data.results?.message || data.message || 'Failed to fetch news');
    }
    
    if (data.status !== 'success') {
      console.error('[NEWS] Unexpected API response status');
      throw new Error('Unexpected API response status');
    }
    
    console.log(`[NEWS] Successfully fetched ${data.results?.length || 0} articles for country: ${country}`);
    
    // FIXED: Changed 'source' to 'sourceName'
    return {
      success: true,
      articles: (data.results || []).map(article => ({
        title: article.title || 'No title available',
        description: article.description || article.content || 'No description available',
        url: article.link || '#',
        urlToImage: article.image_url || null,
        publishedAt: article.pubDate || new Date().toISOString(),
        author: article.creator ? article.creator.join(', ') : null,
        sourceName: article.source_name || article.source_id || 'Unknown Source' // CHANGED HERE
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
