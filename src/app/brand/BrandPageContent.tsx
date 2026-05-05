"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const sections = [
  { name: "Brand Positioning", path: "/brand/brand-positioning" },
  { name: "Logo", path: "#logo" },
  { name: "Color", path: "#color" },
  { name: "Typography", path: "#typography" },
  { name: "Voice & Tone", path: "#voice-tone" },
  { name: "Motion", path: "#motion" },
  { name: "In-house Materials", path: "#in-house-materials" },
];

const revealUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
};

const revealSoft = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
};

export default function BrandPageContent() {
  return (
    <main id="top" className="bg-[#e9eaef] text-black">
      <div className="mx-auto min-h-screen max-w-[1728px]">
        <section className="relative min-h-[400px] overflow-hidden md:min-h-[500px] lg:min-h-[650px]">
          <Image
            src="/brand/hero_bg_brand_new.png"
            alt="GAMA Drones brand hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-transparent to-black/16" />

          <div className="absolute left-0 top-0 z-10 flex w-full items-start justify-between p-8 md:p-10 lg:p-14">
            <motion.div {...revealSoft} className="relative h-24 w-40 md:h-32 md:w-52 lg:h-40 lg:w-64">
              <Image
                src="/logos/gama-logo.png"
                alt="GAMA"
                fill
                sizes="(max-width: 768px) 100px, 200px"
                className="object-contain brightness-0 invert"
              />
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-8 md:px-10 md:pb-10 lg:px-14 lg:pb-14">
            <motion.h1
              {...revealUp}
              className="max-w-4xl text-[1.8rem] font-black leading-[0.95] tracking-[-0.04em] text-white md:text-[3.4rem] lg:text-[4.6rem]"
            >
              Brand Guidelines
            </motion.h1>
          </div>
        </section>

        <motion.section {...revealUp} className="px-8 py-8 md:px-10 md:py-10 lg:px-14 lg:py-12">
          <div className="max-w-[760px]">
            <motion.p
              {...revealSoft}
              className="text-[0.9rem] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[1.2rem] lg:text-[1.4rem]"
            >
              At Gama Drones, our business is about how we move goods. Our brand is about how we move people. How we
              communicate in ways that are as efficient and delightful as our delivery experience. How our words and
              visuals elevate us in the eyes of our customers, our partners, and the world.
            </motion.p>
            <motion.p
              {...revealSoft}
              transition={{ ...revealSoft.transition, delay: 0.08 }}
              className="mt-8 text-[0.8rem] font-semibold leading-[1.2] tracking-[-0.02em] md:mt-10 md:text-[1rem]"
            >
              See how we present ourselves
            </motion.p>
          </div>
        </motion.section>

        <motion.section {...revealUp} className="px-8 pb-16 md:px-10 md:pb-20 lg:px-14 lg:pb-24">
          <motion.div {...revealSoft} className="border-t border-black/70 pt-5 md:pt-6">
            <div className="text-[0.95rem] font-black uppercase tracking-[-0.02em] md:text-[1.15rem]">Contents</div>

            <div className="mt-8 space-y-3 md:mt-10 md:space-y-4 lg:space-y-5">
              {sections.map((section, index) => (
                <motion.div
                  key={section.name}
                  {...revealUp}
                  transition={{ ...revealUp.transition, delay: index * 0.05 }}
                >
                  <Link
                    href={section.path}
                    className="block text-[1.4rem] font-black leading-[0.98] tracking-[-0.05em] transition-all duration-200 hover:translate-x-1 hover:opacity-65 md:text-[2.7rem] lg:text-[3.5rem]"
                  >
                    {section.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...revealSoft}
            transition={{ ...revealSoft.transition, delay: 0.08 }}
            className="mt-16 border-t border-black/70 pt-5 text-right md:mt-20 md:pt-6"
          >
            <div className="text-[0.95rem] font-black uppercase tracking-[-0.02em] md:text-[1.15rem]">Next</div>
            <Link
              href="/brand/brand-positioning"
              className="mt-10 inline-block text-[1.4rem] font-black leading-[0.98] tracking-[-0.05em] transition-all duration-200 hover:-translate-x-1 hover:opacity-65 md:mt-12 md:text-[2.4rem] lg:text-[3rem]"
            >
              Brand Positioning
            </Link>
          </motion.div>
        </motion.section>

        <motion.footer
          {...revealUp}
          className="bg-[#1e73be] px-8 py-10 text-white md:px-10 md:py-14 lg:px-14 lg:py-18"
        >
          <div className="max-w-[1600px]">
            <motion.p
              {...revealSoft}
              className="max-w-[1400px] text-[0.86rem] font-semibold leading-[1.12] tracking-[-0.03em] md:text-[1.28rem] lg:text-[1.72rem]"
            >
              These guidelines were created by the The Gama Design— designers and writers responsible for cohesive and
              consistent use of our brand elements.
            </motion.p>

            <motion.p
              {...revealSoft}
              transition={{ ...revealSoft.transition, delay: 0.05 }}
              className="mt-9 text-[0.86rem] font-semibold leading-[1.12] tracking-[-0.03em] md:mt-12 md:text-[1.25rem] lg:mt-14 lg:text-[1.65rem]"
            >
              If you have questions about using these guidelines, please contact:
            </motion.p>

            <motion.a
              {...revealSoft}
              transition={{ ...revealSoft.transition, delay: 0.08 }}
              href="mailto:brand@gamadrones.com"
              className="mt-1 block text-[1.45rem] font-black leading-none tracking-[-0.07em] text-white hover:opacity-80 md:text-[2.35rem] lg:text-[3.1rem]"
            >
              brand@gamadrones.com
            </motion.a>

            <motion.a
              {...revealSoft}
              transition={{ ...revealSoft.transition, delay: 0.1 }}
              href="#top"
              className="mt-14 inline-block text-[0.9rem] font-black underline decoration-[3px] underline-offset-4 hover:opacity-70 md:mt-18 md:text-[1.2rem] lg:mt-24 lg:text-[1.55rem]"
            >
              Back to top
            </motion.a>
          </div>
        </motion.footer>
      </div>

      <div id="logo" className="h-px w-px opacity-0" />
      <div id="color" className="h-px w-px opacity-0" />
      <div id="typography" className="h-px w-px opacity-0" />
      <div id="voice-tone" className="h-px w-px opacity-0" />
      <div id="motion" className="h-px w-px opacity-0" />
      <div id="in-house-materials" className="h-px w-px opacity-0" />
    </main>
  );
}
