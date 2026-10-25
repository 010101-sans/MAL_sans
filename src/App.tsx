import { useState, useEffect } from 'react';
import { Sun, Moon, Search, Bell, User, Star, PlayCircle, BookOpen } from 'lucide-react';
import { scrapeMalHomepage, type MediaItem } from './utils/scraper';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [malData, setMalData] = useState<{
    username: string;
    seasonalAnime: MediaItem[];
    topAiring: MediaItem[];
    myUpdates: MediaItem[];
  } | null>(null);

  useEffect(() => {
    // Apply dark mode
    const root = document.getElementById('mal-modern-root');
    isDark ? root?.classList.add('dark') : root?.classList.remove('dark');
  }, [isDark]);

  useEffect(() => {
    // Instantly scrape the hidden MAL DOM when React mounts
    const data = scrapeMalHomepage();
    setMalData(data);
  }, []);

  if (!malData) return null; // Prevent flash before scrape

  return (
    <div className="min-h-screen bg-mal-bg text-mal-text transition-colors duration-300 font-sans pb-12">
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-mal-surface/70 border-b border-mal-border shadow-sm">
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
      
      {/* Bento Box Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Spotlight Banner (Using the first Seasonal Anime as a Hero) */}
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
                 <a href="/anime/season" className="text-sm font-semibold text-mal-accent hover:underline">View All</a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {malData.seasonalAnime.slice(1, 9).map((anime) => (
                  <a href={anime.url} key={anime.id} className="group flex flex-col gap-2">
                    <div className="aspect-[2/3] bg-mal-bg rounded-xl border border-mal-border overflow-hidden relative shadow-sm">
                      <img src={anime.image} alt={anime.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                         <PlayCircle className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold leading-tight line-clamp-2 group-hover:text-mal-accent transition-colors">{anime.title}</h3>
                  </a>
                ))}
              </div>
            </section>
            
          </div>

          {/* Right Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* My List Updates Bento */}
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

            {/* Top Airing Bento */}
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
    </div>
  );
}

export default App;