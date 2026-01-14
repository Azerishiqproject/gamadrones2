import Image from 'next/image';

export default function Partners() {
  const partners = [
    { name: 'E-bebek', logo: '/partnerler/ebebek.png' },
    { name: 'Yemeksepeti', logo: '/partnerler/yemeksepeti.png' },
    { name: 'Trendyol', logo: '/partnerler/trendyolgo.png' },
    { name: 'Starbucks', logo: '/partnerler/starbuks.svg' },
    { name: 'Tıklagelsin', logo: '/partnerler/tiklagelisn.png' },
    { name: 'McDonald\'s', logo: '/partnerler/makdonalds.png' },
  ];

  return (
    <section className="w-full bg-white py-24 px-6">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left side - Grid of partner logos */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-full h-24 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={150}
                  height={80}
                  className="object-contain max-h-20 w-auto"
                />
              </div>
            ))}
          </div>

          {/* Right side - T-Motor (larger) */}
          <div className="lg:w-80 flex items-center justify-center pr-16">
            <div className="flex items-center justify-center w-full h-64 grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src="/partnerler/t-motor.png"
                alt="T-Motor"
                width={300}
                height={150}
                className="object-contain max-h-64 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
