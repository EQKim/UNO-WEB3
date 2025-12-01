export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">UNO Online</h1>
      <div className="space-y-4">
        <a 
          href="/lobby" 
          className="block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
        >
          Enter Lobby
        </a>
      </div>
    </main>
  )
}
