import { useState, useEffect } from 'react';
import { Sun, Moon, Search, Bell, User } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(true);

  // Apply the dark class to the root element for Tailwind
  useEffect(() => {
    const root = document.getElementById('mal-modern-root');
    if (isDark) {
      root?.classList.add('dark');
    } else {
      root?.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-mal-bg text-mal-text transition-colors duration-300 font-sans pb-12">
      
      {/* Soft Glassmorphic Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-mal-surface/70 border-b border-mal-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-mal-accent rounded-xl flex items-center justify-center text-white font-bold shadow-glow">
              M
            </div>
            <span className="text-xl font-bold tracking-tight">MyAnimeList</span>
          </div>
          
          <div className="hidden md:flex items-center bg-mal-bg border border-mal-border rounded-xl px-4 py-2 w-96 text-sm text-mal-muted transition-all focus-within:border-mal-accent focus-within:shadow-glow cursor-text">
            <Search className="w-4 h-4 mr-2" />
            <input 
              type="text" 
              placeholder="Search anime, manga, characters..." 
              className="bg-transparent border-none outline-none w-full text-mal-text placeholder-mal-muted"
            />
          </div>

          <div className="flex items-center gap-4 text-mal-muted">
            <button onClick={() => setIsDark(!isDark)} className="hover:text-mal-accent transition-colors p-2 rounded-lg hover:bg-mal-bg">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Bell className="w-5 h-5 hover:text-mal-accent cursor-pointer transition-colors" />
            <div className="w-8 h-8 rounded-full bg-mal-border flex items-center justify-center cursor-pointer hover:ring-2 ring-mal-accent transition-all">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Bento Box Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Spotlight / Continue Watching (Wide Bento) */}
        <section className="w-full h-64 bg-mal-surface border border-mal-border rounded-2xl mb-6 shadow-soft flex items-center justify-center relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-mal-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-mal-muted font-medium z-10">[ Spotlight / Continue Watching Banner ]</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Content Area (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Seasonal Anime Bento */}
            <section className="bg-mal-surface border border-mal-border rounded-2xl p-6 shadow-soft min-h-[400px]">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-mal-accent rounded-full"></span>
                Fall 2026 Anime
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-[2/3] bg-mal-bg rounded-xl border border-mal-border flex items-center justify-center">
                    <span className="text-mal-muted text-sm">Cover {i}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Latest Updated Bento */}
            <section className="bg-mal-surface border border-mal-border rounded-2xl p-6 shadow-soft min-h-[300px]">
              <h2 className="text-lg font-bold mb-4">Latest Episodes</h2>
              <p className="text-mal-muted text-sm text-center mt-20">[ Episode Grid ]</p>
            </section>
          </div>

          {/* Right Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* User Stats Bento */}
            <section className="bg-mal-surface border border-mal-border rounded-2xl p-6 shadow-soft">
              <h3 className="font-bold mb-4">My Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-mal-muted">Anime Entries</span>
                  <span className="font-semibold">169</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-mal-muted">Manga Entries</span>
                  <span className="font-semibold">138</span>
                </div>
              </div>
            </section>

            {/* Top Airing Bento */}
            <section className="bg-mal-surface border border-mal-border rounded-2xl p-6 shadow-soft min-h-[400px]">
              <h3 className="font-bold mb-4">Top Airing Anime</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <span className="text-mal-muted font-bold text-lg w-4">{i}</span>
                    <div className="w-12 h-16 bg-mal-bg rounded-lg border border-mal-border shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-4 w-3/4 bg-mal-bg rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-mal-bg rounded"></div>
                    </div>
                  </div>
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