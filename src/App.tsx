function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 font-sans">
      <header className="flex justify-between items-center py-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-blue-500">MyAnimeList <span className="text-white">Modern</span></h1>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold transition">
            Login
          </button>
        </div>
      </header>
      <main className="mt-12 text-center text-gray-400">
        <p>MAL DOM successfully hijacked. Ready to build.</p>
      </main>
    </div>
  )
}

export default App