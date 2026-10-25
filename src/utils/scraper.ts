export interface MediaItem {
  id: string;
  title: string;
  image: string;
  url: string;
  meta?: string;
  rank?: string;
}

export const scrapeMalHomepage = () => {
  const getImgUrl = (el: Element | null) => {
    if (!el) return '';
    // MAL uses lazy loading, so we must grab data-src first
    return el.getAttribute('data-src') || el.getAttribute('src') || '';
  };

  // 1. Scrape User Stats & Info
  const username = document.querySelector('.header-profile-link')?.textContent?.trim() || 'User';
  
  // 2. Scrape Seasonal Anime
  const seasonalNodes = document.querySelectorAll('.widget.seasonal .btn-anime');
  const seasonalAnime: MediaItem[] = Array.from(seasonalNodes).map((node, i) => ({
    id: `seasonal-${i}`,
    title: node.querySelector('.title')?.textContent?.trim() || '',
    image: getImgUrl(node.querySelector('img')),
    url: node.querySelector('a.link')?.getAttribute('href') || '#',
  }));

  // 3. Scrape Top Airing
  const topAiringNodes = document.querySelectorAll('.widget.airing_ranking .ranking-unit');
  const topAiring: MediaItem[] = Array.from(topAiringNodes).map((node, i) => {
    const infoText = node.querySelector('.data .info')?.textContent?.trim() || '';
    // Extracts "scored 9.04" from "ONA, 0 eps, scored 9.04"
    const scoreMatch = infoText.match(/scored ([\d.]+)/); 
    
    return {
      id: `top-${i}`,
      rank: node.querySelector('.rank')?.textContent?.trim() || '',
      title: node.querySelector('.data .title')?.textContent?.trim() || '',
      image: getImgUrl(node.querySelector('.data-image img')),
      url: node.querySelector('.data .title')?.getAttribute('href') || '#',
      meta: scoreMatch ? scoreMatch[1] : 'N/A'
    };
  });

  // 4. Scrape User's Last List Updates
  const updateNodes = document.querySelectorAll('.widget.my_list_updates .item');
  const myUpdates: MediaItem[] = Array.from(updateNodes).map((node, i) => {
    const titleEl = node.querySelector('.info p:first-child a.fw-b');
    // Extracts "Watching at 1 of 101" etc.
    const statusEl = node.querySelector('.info p:nth-child(2)'); 
    
    return {
      id: `update-${i}`,
      title: titleEl?.textContent?.trim() || '',
      image: getImgUrl(node.querySelector('.image img')),
      url: titleEl?.getAttribute('href') || '#',
      meta: statusEl?.textContent?.replace(/\s+/g, ' ').trim() || ''
    };
  });

  return { username, seasonalAnime, topAiring, myUpdates };
};