import { useState, useEffect } from 'react';
import { Sun, Moon, Search, Bell, User, Star, PlayCircle, BookOpen, Newspaper } from 'lucide-react';
import { scrapeMalHomepage, type MediaItem } from './utils/scraper';

const NAV_LINKS = ['Anime', 'Manga', 'Community', 'Industry', 'Watch', 'Read', 'Help'];

function App() {
  const [isDark, setIsDark] = useState(true);
  const [malData, setMalData] = useState<{
    username: string;
    seasonalAnime: MediaItem[];
    topAiring: MediaItem[];
    myUpdates: MediaItem[];
    episodes: MediaItem[];
    news: MediaItem[];
  } | null>(null);

  useEffect(() => {
    const root = document.getElementById('mal-modern-root');
    isDark ? root?.classList.add('dark') : root?.classList.remove('dark');
  }, [isDark]);

  useEffect(() => {
    setMalData(scrapeMalHomepage());
  }, []);

  if (!malData) return null;

  return (
    <div className="min-h-screen bg-mal-bg text-mal-text transition-colors duration-300 font-sans">
      
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-mal-surface/80 border-b border-mal-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-mal-accent rounded-xl flex items-center justify-center text-white font-bold shadow-glow">M</div>
            <span className="text-xl font-bold tracking-tight">MyAnimeList</span>
          </div>
          
          <div className="hidden md:flex items-center bg-mal-bg border border-mal-border rounded-xl px-4 py-2 w-96 text-sm text-mal-muted transition-all focus-within:border-mal-accent focus-within:shadow-glow cursor-text">
            <Search className="w-4 h-4 mr-2" />
            <input type="text" placeholder="Search anime, manga, characters..." className="bg-transparent border-none outline-none w-full text-mal-text placeholder-mal-muted" />
          </div>

          <div className="flex items-center gap-4 text-mal-muted">
            <button onClick={() => setIsDark(!isDark)} className="hover:text-mal-accent transition-colors p-2 rounded-lg hover:bg-mal-bg">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Bell className="w-5 h-5 hover:text-mal-accent cursor-pointer transition-colors" />
            <div className="flex items-center gap-2 cursor-pointer hover:text-mal-text transition-colors">
               <div className="w-8 h-8 rounded-full bg-mal-border flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5" />
               </div>
               <span className="font-semibold text-sm hidden sm:block">{malData.username}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-mal-surface border-b border-mal-border hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-8 text-sm font-bold text-mal-muted uppercase tracking-wider">
          {NAV_LINKS.map(link => (
            <a href={`/${link.toLowerCase()}`} key={link} className="hover:text-mal-accent transition-colors">{link}</a>
          ))}
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Spotlight Banner */}
        {malData.seasonalAnime[0] && (
          <a href={malData.seasonalAnime[0].url} className="block w-full h-72 bg-mal-surface border border-mal-border rounded-2xl mb-6 shadow-soft relative overflow-hidden group cursor-pointer">
            <img src={malData.seasonalAnime[0].image.replace('160x220', '800x1200')} alt="Spotlight" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-mal-bg via-mal-bg/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 z-10 w-full">
              <span className="bg-mal-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3 inline-block">Top Seasonal</span>
              <h1 className="text-4xl font-bold mb-2 drop-shadow-lg text-white">{malData.seasonalAnime[0].title}</h1>
            </div>
          </a>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Content Area (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Seasonal Anime Bento */}
            <section className="bg-mal-surface border border-mal-border rounded-2xl p-6 shadow-soft">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold flex items-center gap-2">
                   <span className="w-2 h-6 bg-mal-accent rounded-full"></span>
                   Fall 2026 Anime
                 </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {malData.seasonalAnime.slice(1, 9).map((anime) => (
                  <a href={anime.url} key={anime.id} className="group flex flex-col gap-2">
                    <div className="aspect-[2/3] bg-mal-bg rounded-xl border border-mal-border overflow-hidden relative shadow-sm">
                      <img src={anime.image} alt={anime.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="text-sm font-bold leading-tight line-clamp-2 group-hover:text-mal-accent transition-colors">{anime.title}</h3>
                  </a>
                ))}
              </div>
            </section>

            {/* Latest Episodes Bento */}
            {malData.episodes.length > 0 && (
              <section className="bg-mal-surface border border-mal-border rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-mal-accent" />
                  Latest Episodes
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                  {malData.episodes.slice(0, 4).map((ep) => (
                    <a href={ep.url} key={ep.id} className="group flex flex-col gap-2">
                      <div className="aspect-[2/3] bg-mal-bg rounded-xl border border-mal-border overflow-hidden relative shadow-sm">
                        <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <PlayCircle className="w-12 h-12 text-white/90 shadow-lg" />
                        </div>
                      </div>
                      <h3 className="text-sm font-bold leading-tight line-clamp-1 group-hover:text-mal-accent transition-colors">{ep.title}</h3>
                      <p className="text-xs font-semibold text-mal-muted">{ep.meta}</p>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* News Bento */}
            {malData.news.length > 0 && (
              <section className="bg-mal-surface border border-mal-border rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-mal-accent" />
                  Anime & Manga News
                </h2>
                <div className="space-y-6">
                  {malData.news.slice(0, 3).map((item) => (
                    <a href={item.url} key={item.id} className="flex gap-4 group">
                      <img src={item.image} alt="News" className="w-24 h-24 object-cover rounded-xl border border-mal-border shrink-0 shadow-sm" />
                      <div>
                        <h3 className="text-base font-bold group-hover:text-mal-accent transition-colors line-clamp-2 mb-1">{item.title}</h3>
                        <p className="text-sm text-mal-muted line-clamp-2 leading-relaxed">{item.text}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
            
          </div>

          {/* Right Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* My List Updates */}
            <section className="bg-mal-surface border border-mal-border rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <BookOpen className="w-5 h-5 text-mal-accent" />
                 Recent Activity
              </h3>
              <div className="space-y-4">
                 {malData.myUpdates.map((item) => (
                   <a href={item.url} key={item.id} className="flex gap-4 items-center group p-2 -mx-2 rounded-xl hover:bg-mal-bg transition-colors">
                     <img src={item.image} alt={item.title} className="w-12 h-16 object-cover rounded-lg border border-mal-border shadow-sm shrink-0" />
                     <div className="flex-1 min-w-0">
                       <h4 className="text-sm font-bold text-mal-text truncate group-hover:text-mal-accent transition-colors">{item.title}</h4>
                       <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-mal-border text-mal-text">
                         {item.meta}
                       </span>
                     </div>
                   </a>
                 ))}
              </div>
            </section>

            {/* Top Airing Globally */}
            <section className="bg-mal-surface border border-mal-border rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                 Top Airing Globally
              </h3>
              <div className="space-y-4">
                {malData.topAiring.slice(0, 5).map((anime) => (
                  <a href={anime.url} key={anime.id} className="flex gap-4 items-center group">
                    <span className="text-mal-muted font-black text-xl w-5 text-center">{anime.rank}</span>
                    <img src={anime.image} alt={anime.title} className="w-12 h-16 object-cover rounded-lg border border-mal-border shrink-0 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-mal-accent transition-colors">{anime.title}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                         <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                         <span className="text-xs font-bold text-mal-muted">{anime.meta}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
            
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-mal-surface border-t border-mal-border pt-12 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-mal-text text-sm font-semibold">
             <a href="/" className="hover:text-mal-accent transition-colors">Home</a>
             <a href="/about.php" className="hover:text-mal-accent transition-colors">About</a>
             <a href="/pressroom" className="hover:text-mal-accent transition-colors">Press Room</a>
             <a href="/about.php?go=contact" className="hover:text-mal-accent transition-colors">Support</a>
             <a href="/advertising" className="hover:text-mal-accent transition-colors">Advertising</a>
             <a href="/forum/?topicid=515949" className="hover:text-mal-accent transition-colors">FAQ</a>
             <a href="/about/terms_of_use" className="hover:text-mal-accent transition-colors">Terms</a>
             <a href="/about/privacy_policy" className="hover:text-mal-accent transition-colors">Privacy</a>
          </div>
          <div className="w-12 h-1 bg-mal-border rounded-full"></div>
          <p className="text-xs text-mal-muted">MyAnimeList.net is a property of MyAnimeList Co., Ltd. ©2026 All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;