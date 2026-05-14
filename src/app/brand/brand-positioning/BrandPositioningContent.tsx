"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

const revealUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
};

const revealSoft = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
};

const introStatement =
  "We focus on building the future, improving everyday life, and redefining the possibilities of aerial technology. To us, the sky has always been beautiful.";

const brandValues = [
  {
    label: "sustainable energy",
    title: "Sustainable Energy",
    desc: "We respect nature and protect it for the future, building technology that moves with responsibility.",
  },
  {
    label: "uncompromising safety",
    title: "Uncompromising Safety",
    desc: "Safety is our highest standard. Every system, decision, and detail must earn trust before it takes flight.",
  },
  {
    label: "rethinking engineering",
    title: "Rethinking Engineering",
    desc: "Engineering is our challenge. We question assumptions, rebuild from first principles, and design for better skies.",
  },
  {
    label: "continuous technology",
    title: "Continuous Technology",
    desc: "We keep improving according to real needs, turning progress into a habit rather than a milestone.",
  },
];

function TypewriterText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);
  const displayedCount = shouldReduceMotion ? text.length : visibleCount;

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const interval = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= text.length) {
          window.clearInterval(interval);
          return count;
        }

        return count + 1;
      });
    }, 28);

    return () => window.clearInterval(interval);
  }, [isInView, shouldReduceMotion, text]);

  return (
    <span ref={ref} className="block" aria-label={text}>
      {Array.from(text).map((character, index) => (
        <span
          key={`${character}-${index}`}
          className={index < displayedCount ? "opacity-100" : "opacity-0"}
          aria-hidden="true"
        >
          {character}
        </span>
      ))}
    </span>
  );
}

export default function BrandPositioningContent() {
  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const activeValue = brandValues[activeValueIndex];

  return (
    <main id="top" className="bg-[#e9eaef] text-black">
      <div className="mx-auto min-h-screen max-w-[1728px]">
        <section className="relative min-h-[500px] overflow-hidden md:min-h-[600px] lg:min-h-[800px]">
          <Image
            src="/brand/brand_positioning.png"
            alt="GAMA Drones brand positioning hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute left-0 top-0 z-10 flex w-full items-start justify-between p-8 md:p-10 lg:p-14">
            <motion.div {...revealSoft}>
              <Link href="/brand" className="relative block h-24 w-40 md:h-32 md:w-52 lg:h-40 lg:w-64">
                <Image
                  src="/logos/gama-logo.png"
                  alt="GAMA"
                  fill
                  sizes="(max-width: 768px) 100px, 200px"
                  className="object-contain brightness-0 invert"
                />
              </Link>
            </motion.div>

            <motion.div
              {...revealSoft}
              transition={{ ...revealSoft.transition, delay: 0.2 }}
              className="flex h-24 w-40 items-center justify-end text-right md:h-32 md:w-52 lg:h-40 lg:w-64"
            >
              <div className="text-[0.9rem] font-medium text-white/90 md:text-[1.1rem] lg:text-[1.4rem]">
                Brand Guidelines
              </div>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 p-8 md:p-10 lg:p-14">
            <motion.h1
              {...revealUp}
              transition={{ ...revealUp.transition, delay: 0.1 }}
              className="max-w-4xl text-[3rem] font-black leading-[0.9] tracking-[-0.04em] text-white md:text-[5rem] lg:text-[6.5rem]"
            >
              Brand Positioning
            </motion.h1>
          </div>
        </section>

        <motion.section {...revealUp} className="px-8 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="relative flex flex-col gap-12 md:min-h-[120px] md:flex-row md:items-start md:justify-between lg:min-h-[150px]">
            <motion.h1 {...revealSoft} className="text-[1.3rem] font-black uppercase tracking-tight md:text-[1.5rem]">
              Content
            </motion.h1>

            <div className="flex flex-col gap-2 text-center md:absolute md:left-1/2 md:-translate-x-1/2 md:text-left">
              {[
                "Introduction",
                "Our Mission & Vision",
                "Our Belief",
                "Our Values",
                "Our Philosophy",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  {...revealSoft}
                  transition={{ ...revealSoft.transition, delay: index * 0.12 }}
                  className="text-[1.1rem] font-medium md:text-[1.3rem]"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="hidden w-24 md:block" />
          </div>

          <motion.div
            {...revealUp}
            transition={{ ...revealUp.transition, delay: 0.15 }}
            className="mt-20 flex justify-center text-center md:mt-24 lg:mt-32"
          >
            <h2 className="max-w-[1200px] text-[1.3rem] font-extralight leading-[1.2] tracking-tight md:text-[2.4rem] lg:text-[3.5rem]">
              <TypewriterText text={introStatement} />
            </h2>
          </motion.div>

          <motion.div {...revealSoft} className="mt-16 border-b border-black/80 md:mt-20 lg:mt-24" />
        </motion.section>

        <motion.section {...revealUp} className="px-8 pb-12 md:px-10 md:pb-16 lg:px-14 lg:pb-20">
          <div className="mx-auto max-w-[1400px] space-y-8 md:space-y-12 lg:space-y-16">
            <motion.div
              {...revealUp}
              transition={{ ...revealUp.transition, delay: 0.1 }}
              className="group relative h-[180px] w-full overflow-hidden rounded-[2rem] md:h-[300px] lg:h-[350px]"
            >
              <Image
                src="/brand/positioning_1.png"
                alt="Our Mission"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/40" />

              <div className="absolute left-8 top-8 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:left-12 md:top-12">
                <span className="text-[1.1rem] font-black uppercase tracking-tight text-white md:text-[1.4rem]">
                  Our Mission
                </span>
              </div>

              <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center opacity-0 transition-all duration-700 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="max-w-5xl text-[1.1rem] font-medium leading-[1.3] text-white md:text-[1.8rem] lg:text-[2.2rem]">
                  Bridging the skies and sustainable engineering through cutting-edge technology.
                </p>
              </div>
            </motion.div>

            <motion.div {...revealSoft} className="border-b border-black/80" />

            <motion.div
              {...revealUp}
              transition={{ ...revealUp.transition, delay: 0.25 }}
              className="group relative h-[180px] w-full overflow-hidden rounded-[2rem] md:h-[300px] lg:h-[350px]"
            >
              <Image
                src="/brand/positioning_2.png"
                alt="Our Vision"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/40" />

              <div className="absolute left-8 top-8 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:left-12 md:top-12">
                <span className="text-[1.1rem] font-black uppercase tracking-tight text-white md:text-[1.4rem]">
                  Our Vision
                </span>
              </div>

              <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center opacity-0 transition-all duration-700 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="max-w-6xl text-[1.1rem] font-medium leading-[1.3] text-white md:text-[1.8rem] lg:text-[2.2rem]">
                  Redefining aviation through innovative technologies to explore the skies in a human-centric, secure,
                  swift, and agile way.
                </p>
              </div>
            </motion.div>

            <motion.div {...revealSoft} className="border-b border-black/80" />
          </div>
        </motion.section>

        <motion.section {...revealUp} className="px-8 pb-12 pt-4 md:px-10 md:pb-16 md:pt-6 lg:px-14 lg:pb-20 lg:pt-8">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <motion.h2 {...revealSoft} className="text-[1.3rem] font-black uppercase tracking-tight md:text-[1.5rem]">Our Belief</motion.h2>
          </div>

          <motion.div
            {...revealUp}
            transition={{ ...revealUp.transition, delay: 0.1 }}
            className="mt-12 flex justify-center text-center md:mt-16 lg:mt-20"
          >
            <p className="max-w-[1200px] text-[1.5rem] font-medium leading-[1.2] tracking-tight md:text-[3rem] lg:text-[4rem]">
              We believe the sky is the next frontier for humanity.
            </p>
          </motion.div>

          <motion.div {...revealSoft} className="mt-16 border-b border-black/80 md:mt-20 lg:mt-24" />
        </motion.section>

        <motion.section {...revealUp} className="px-8 py-4 md:px-10 md:py-8 lg:px-14 lg:py-8">
          <div className="grid grid-cols-1 gap-12">
            <div>
              <motion.h2 {...revealSoft} className="text-[1.3rem] font-black uppercase tracking-tight md:text-[1.5rem]">Our Values</motion.h2>
            </div>

            <div className="grid gap-10 md:pl-[5%] lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.75fr)] lg:items-start lg:gap-20 lg:pl-[5%]">
              <motion.div
                {...revealUp}
                transition={{ ...revealUp.transition, delay: 0.1 }}
                className="max-w-[780px] text-[1.75rem] font-normal leading-[1.18] tracking-tight md:text-[2.4rem] lg:text-[2.75rem]"
              >
                Our foundational values are{" "}
                <button
                  type="button"
                  onClick={() => setActiveValueIndex(0)}
                  className={`inline text-left transition-colors duration-500 hover:text-[#ff4a0a] ${
                    activeValueIndex === 0 ? "text-[#ff4a0a]" : "text-black"
                  }`}
                >
                  {brandValues[0].label}
                  <sup className="ml-1 text-[0.45em] leading-none">1</sup>
                </button>
                ,{" "}
                <button
                  type="button"
                  onClick={() => setActiveValueIndex(1)}
                  className={`inline text-left transition-colors duration-500 hover:text-[#ff4a0a] ${
                    activeValueIndex === 1 ? "text-[#ff4a0a]" : "text-black"
                  }`}
                >
                  {brandValues[1].label}
                  <sup className="ml-1 text-[0.45em] leading-none">2</sup>
                </button>
                ,{" "}
                <button
                  type="button"
                  onClick={() => setActiveValueIndex(2)}
                  className={`inline text-left transition-colors duration-500 hover:text-[#ff4a0a] ${
                    activeValueIndex === 2 ? "text-[#ff4a0a]" : "text-black"
                  }`}
                >
                  {brandValues[2].label}
                  <sup className="ml-1 text-[0.45em] leading-none">3</sup>
                </button>{" "}
                &amp;{" "}
                <button
                  type="button"
                  onClick={() => setActiveValueIndex(3)}
                  className={`inline text-left transition-colors duration-500 hover:text-[#ff4a0a] ${
                    activeValueIndex === 3 ? "text-[#ff4a0a]" : "text-black"
                  }`}
                >
                  {brandValues[3].label}
                  <sup className="ml-1 text-[0.45em] leading-none">4</sup>
                </button>
              </motion.div>

              <motion.div
                {...revealSoft}
                transition={{ ...revealSoft.transition, delay: 0.18 }}
                className="relative min-h-[320px] overflow-hidden bg-[#a98fd1] p-6 md:min-h-[380px] md:p-8 lg:mt-32 lg:min-h-[380px] lg:max-w-[420px] lg:p-8"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeValue.title}
                    initial={{ opacity: 0, y: -42, rotateX: -8 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: 28, rotateX: 6 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="origin-top bg-[#0874df] p-6 text-white shadow-[0_18px_0_rgba(0,0,0,0.12)] md:p-8"
                  >
                    <p className="text-[1rem] font-medium leading-[1.16] tracking-tight text-white/90 md:text-[1.2rem] lg:text-[1.35rem]">
                      {activeValue.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          <motion.div {...revealSoft} className="mt-16 border-b border-black/80 md:mt-20 lg:mt-24" />
        </motion.section>

        <motion.section {...revealUp} className="px-8 py-14 md:px-10 md:py-18 lg:px-14 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <motion.h2 {...revealSoft} className="text-[1.3rem] font-black uppercase tracking-tight md:text-[1.5rem]">
                Our Philosophy
              </motion.h2>
            </div>

            <div className="mt-20 space-y-12 md:mt-24 md:space-y-16 lg:col-span-9 lg:mt-28 lg:space-y-18">
              <div className="w-full max-w-[1120px] space-y-12 md:space-y-16 lg:-ml-[100px] lg:space-y-18">
                {[
                  {
                    title: "Human",
                    desc: "We are human, and our humanity is our first priority.",
                  },
                  {
                    title: "Elegance",
                    desc: "We define what beauty means to us.",
                  },
                  {
                    title: "Nature",
                    desc: "A nature-integrated perspective.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    {...revealUp}
                    transition={{ ...revealUp.transition, delay: index * 0.2 }}
                    className="flex flex-col gap-6 md:grid md:grid-cols-[430px_20px_320px] md:items-center md:gap-x-10 lg:grid-cols-[470px_20px_340px] lg:gap-x-12"
                  >
                    <div>
                      <h3 className="text-center text-[2.9rem] font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-right md:text-[4.5rem] lg:text-[5.8rem] xl:text-[6.2rem]">
                        {item.title}
                      </h3>
                    </div>

                    <div className="hidden h-[108px] w-px justify-self-center bg-black/90 md:block lg:h-[120px]" />

                    <p className="max-w-[280px] text-[1.3rem] leading-[0.96] tracking-[-0.03em] md:max-w-[320px] md:text-[1.7rem] lg:max-w-[340px] lg:text-[1.95rem] xl:text-[2.05rem]">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-12 lg:mt-14" />
        </motion.section>

        <motion.section
          {...revealUp}
          className="mt-6 border-t-2 border-black/90 px-8 py-8 md:mt-8 md:px-10 md:py-10 lg:mx-14 lg:mt-10 lg:px-0 lg:py-12"
        >
          <div className="flex items-start justify-between gap-6">
            <motion.div {...revealSoft}>
              <p className="text-[1.05rem] font-black uppercase leading-none tracking-[-0.05em] md:text-[1.4rem] lg:text-[1.8rem]">
                Back
              </p>
              <Link
                href="/brand"
                className="mt-14 block text-[1.7rem] font-black leading-[0.92] tracking-[-0.07em] hover:opacity-60 md:mt-16 md:text-[2.7rem] lg:mt-18 lg:text-[3.8rem]"
              >
                Introduction
              </Link>
            </motion.div>

            <motion.div {...revealSoft} transition={{ ...revealSoft.transition, delay: 0.06 }} className="text-right">
              <p className="text-[1.05rem] font-black uppercase leading-none tracking-[-0.05em] md:text-[1.4rem] lg:text-[1.8rem]">
                Next
              </p>
              <Link
                href="/brand/typography"
                className="mt-14 block text-[1.7rem] font-black leading-[0.92] tracking-[-0.07em] hover:opacity-60 md:mt-16 md:text-[2.7rem] lg:mt-18 lg:text-[3.8rem]"
              >
                Typography
              </Link>
            </motion.div>
          </div>
        </motion.section>

        <motion.footer
          {...revealUp}
          className="bg-[linear-gradient(135deg,#0b8fe8_0%,#63bdf2_100%)] px-8 py-10 text-white md:px-10 md:py-14 lg:px-14 lg:py-18"
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
              className="mt-14 inline-block text-[0.9rem] font-black underline decoration-[3px] underline-offset-4 hover:opacity-80 md:mt-18 md:text-[1.2rem] lg:mt-24 lg:text-[1.55rem]"
            >
              Back to top
            </motion.a>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
