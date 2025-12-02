// Map Page - Placeholder
// This will contain the Mapbox map interface

function MapPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-display uppercase tracking-tight text-stone-800 mb-4">
          MAP
        </h1>
        <p className="text-stone-500 text-sm mb-6">
          Mapbox integration coming soon
        </p>
        {/* Test colored div - Tailwind verification */}
        <div className="inline-block bg-status-active text-white px-4 py-2 rounded-base text-xs uppercase tracking-wide mb-4">
          Tailwind Active
        </div>
        <div className="bg-stone-800 text-white p-4">Token Test</div>
      </div>
    </div>
  );
}

export default MapPage;
