import Image from 'next/image';

export default function InnovationSection() {
  return (
    <section className="w-full bg-gray-50 py-40 px-0">
      <div className="relative w-full h-[900px] overflow-hidden">
        <Image
          src="/component-bg2.png"
          alt="Innovation background"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Innovation in Our Creativity
            </h2>
            <p className="text-lg md:text-xl text-black/90 leading-relaxed">
              Gama is changing the way we understand engineering with its unique technologies. The world is our home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
