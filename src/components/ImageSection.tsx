import Image from 'next/image';

export default function ImageSection() {
  return (
    <section className="w-full relative">
      <div className="relative w-full h-auto overflow-hidden">
        <Image
          src="/component-bg3.png"
          alt="Background image"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          priority
        />

        {/* Overlay Image - full width and height */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src="/component-image1.png"
              alt="Drone visualization"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/50 to-transparent pointer-events-none" />
        {/* Middle gradient fade - softens the white band */}
        <div className="absolute top-1/2 left-0 right-0 h-64 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
