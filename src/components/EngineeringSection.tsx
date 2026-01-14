import Image from "next/image";

export default function EngineeringSection() {
  return (
    <section className="w-full bg-gray-50 py-40 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left - Text */}
        <div className="flex-1">
        <h2 className="text-3xl md:text-5xl font-semibold text-black leading-snug mb-10 max-w-3xl">
          Our Engineering Partner
        </h2>
        <p className="text-lg md:text-xl text-black/80 leading-relaxed max-w-4xl">
          Our advanced technologies are more than just machines; they represent a transformative alternative designed to change the world and be put to practical use for the benefit of humanity.
          We value our engineers and the engineering excellence behind our work, and we thank our engineering partners for their support.
        </p>
        </div>

        {/* Right - Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <Image
              src="/icon/tmotor.webp"
              alt="T-Motor engineering partner"
              width={500}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
