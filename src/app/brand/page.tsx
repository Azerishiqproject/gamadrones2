import Image from "next/image";

export const metadata = {
  title: "Brand Guidelines | GAMA Drones",
  description: "Brand positioning, logo, color, typography, voice and motion guidelines for GAMA Drones.",
};

const sections = [
  "Brand Positioning",
  "Logo",
  "Color",
  "Typography",
  "Voice & Tone",
  "Motion",
  "In-house Materials",
];

export default function BrandPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main id="top" className="bg-[#e9eaef] text-black">
      <div className="mx-auto min-h-screen max-w-[1728px]">
        <section className="relative min-h-[240px] overflow-hidden md:min-h-[320px] lg:min-h-[420px]">
          <Image
            src="/hero_bg.png"
            alt="GAMA Drones brand hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-transparent to-black/16" />

          <div className="absolute left-0 top-0 z-10 flex w-full items-start justify-between p-8 md:p-10 lg:p-14">
            <div className="relative h-10 w-14 md:h-10 md:w-16 lg:h-12 lg:w-20">
              <Image
                src="/gama-logo.png"
                alt="GAMA"
                fill
                sizes="160px"
                className="object-contain brightness-0 invert"
              />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-8 md:px-10 md:pb-10 lg:px-14 lg:pb-14">
            <h1 className="max-w-4xl text-[1.8rem] font-black leading-[0.95] tracking-[-0.04em] text-white md:text-[3.4rem] lg:text-[4.6rem]">
              Brand Guidelines
            </h1>
          </div>
        </section>

        <section className="px-8 py-8 md:px-10 md:py-10 lg:px-14 lg:py-12">
          <div className="max-w-[760px]">
            <p className="text-[0.78rem] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[1rem] lg:text-[1.15rem]">
              At Gama Drones, our business is about how we move goods. Our
              brand is about how we move people. How we communicate in ways that
              are as efficient and delightful as our delivery experience. How
              our words and visuals elevate us in the eyes of our customers, our
              partners, and the world.
            </p>
            <p className="mt-8 text-[0.8rem] font-medium md:mt-10 md:text-[1rem]">
              See how we present ourselves
            </p>
          </div>
        </section>

        <section className="px-8 pb-16 md:px-10 md:pb-20 lg:px-14 lg:pb-24">
          <div className="border-t border-black/70 pt-5 md:pt-6">
            <div className="text-[0.95rem] font-black uppercase tracking-[-0.02em] md:text-[1.15rem]">
              Contents
            </div>

            <div className="mt-8 space-y-3 md:mt-10 md:space-y-4 lg:space-y-5">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="block text-[1.4rem] font-black leading-[0.98] tracking-[-0.05em] transition-all duration-200 hover:translate-x-1 hover:opacity-65 md:text-[2.7rem] lg:text-[3.5rem]"
                >
                  {section}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-black/70 pt-5 md:mt-20 md:pt-6">
            <div className="text-[0.95rem] font-black uppercase tracking-[-0.02em] md:text-[1.15rem]">
              Next
            </div>
            <a
              href="#brand-positioning"
              className="mt-10 inline-block text-[1.4rem] font-black leading-[0.98] tracking-[-0.05em] transition-all duration-200 hover:translate-x-1 hover:opacity-65 md:mt-12 md:text-[2.4rem] lg:text-[3rem]"
            >
              Brand Positioning
            </a>
          </div>
        </section>

        <footer className="bg-[#617b8f] px-8 py-12 text-white md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="max-w-[980px]">
            <p className="max-w-[860px] text-[0.78rem] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[0.98rem] lg:text-[1.1rem]">
              These guidelines were created by Gama Design, the team
              responsible for ensuring consistent and cohesive use of our brand
              elements.
            </p>

            <p className="mt-10 max-w-[840px] text-[0.78rem] font-semibold leading-[1.2] tracking-[-0.02em] md:mt-12 md:text-[0.98rem] lg:text-[1.1rem]">
              If you have questions about using these guidelines, please
              contact:
            </p>

            <a
              href="mailto:brand@gamadrones.com"
              className="mt-2 inline-block text-[0.8rem] font-black leading-none tracking-[-0.04em] text-white hover:opacity-80 md:text-[0.98rem] lg:text-[1.1rem]"
            >
              brand@gamadrones.com
            </a>

           

            <p className="mt-10 text-sm font-medium text-white/70 md:text-base">
              © {currentYear} GAMA Drones
            </p>
          </div>
        </footer>
      </div>

      <div id="brand-positioning" className="h-px w-px opacity-0" />
      <div id="logo" className="h-px w-px opacity-0" />
      <div id="color" className="h-px w-px opacity-0" />
      <div id="typography" className="h-px w-px opacity-0" />
      <div id="voice-tone" className="h-px w-px opacity-0" />
      <div id="motion" className="h-px w-px opacity-0" />
      <div id="in-house-materials" className="h-px w-px opacity-0" />
    </main>
  );
}
