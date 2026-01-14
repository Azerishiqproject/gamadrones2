export default function DeliveryService() {
  return (
    <section className="w-full bg-white py-40 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <h2 className="text-4xl md:text-6xl font-bold text-black leading-tight">
            Delivery-as-a-Service
          </h2>
          <svg 
            className="w-12 h-12 md:w-16 md:h-16 text-black flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
            />
          </svg>
        </div>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          Gama owns and operates the eX3 fleet; customers simply pay a per-delivery technology fee instead of buying hardware or adding couriers.
        </p>
      </div>
    </section>
  );
}
