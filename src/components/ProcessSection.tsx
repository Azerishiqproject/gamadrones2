import Image from 'next/image';

export default function ProcessSection() {
  const steps = [
    {
      image: '/icon/icon1.png',
      description: 'The delivery team leaves the package at the on-site Gama Hub.',
    },
    {
      image: '/icon/icon2.png',
      description: 'eX3 takes over, flying it directly to the customer.',
    },
    {
      image: '/icon/icon3.png',
      description: "It's lowered gently to the doorstep; ready to pick up.",
    },
  ];

  return (
    <section className="w-full bg-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold text-black text-center mb-16">
          We manage our process professionally.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-6 flex items-center justify-center w-full h-64">
                <Image
                  src={step.image}
                  alt={`Step ${index + 1}`}
                  width={300}
                  height={300}
                  className="object-contain w-full h-full"
                />
              </div>
              <p className="text-lg text-black/80 leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
