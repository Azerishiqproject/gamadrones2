"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

const contentItems = [
  { label: "Introduction", href: "#introduction" },
  { label: "Core Palette", href: "#core-palette" },
  { label: "Extended Palette", href: "#extended-palette" },
  { label: "Titaniums", href: "#titaniums" },
];

const introHeading = "Where advanced engineering meets the horizon.";

const introBody =
  "Our color palette acts as the bridge between technology and humanity, carefully calibrated to reflect our structural elegance and core values.";

const corePalette = [
  {
    name: "Deep Space Black",
    rgb: "2/8/20",
    cmyk: "90/60/0/92",
    hex: "#020814",
    swatch: "#020814",
    textClassName: "text-white",
  },
  {
    name: "Titanium Grey",
    rgb: "155/155/155",
    cmyk: "0/0/0/39",
    hex: "#9B9B9B",
    swatch: "#9B9B9B",
    textClassName: "text-white",
  },
  {
    name: "Royal Space Blue",
    rgb: "3/36/107",
    cmyk: "97/66/0/58",
    hex: "#03246B",
    swatch: "#03246B",
    textClassName: "text-white",
  },
  {
    name: "Space Steel Blue",
    rgb: "24/59/78",
    cmyk: "69/24/0/69",
    hex: "#183B4E",
    swatch: "#183B4E",
    textClassName: "text-white",
  },
];

const extendedPalette = [
  {
    name: "Steel Mist",
    rgb: "102/112/133",
    cmyk: "23/16/0/48",
    hex: "#667085",
    swatch: "#667085",
    textClassName: "text-white",
  },
  {
    name: "Arctic Silver",
    rgb: "220/227/234",
    cmyk: "6/3/0/8",
    hex: "#DCE3EA",
    swatch: "#DCE3EA",
    textClassName: "text-black",
  },
  {
    name: "Burnt Copper",
    rgb: "107/31/0",
    cmyk: "0/71/100/58",
    hex: "#6B1F00",
    swatch: "#6B1F00",
    textClassName: "text-white",
  },
  {
    name: "Deep Teal",
    rgb: "0/85/78",
    cmyk: "100/0/8/67",
    hex: "#00554E",
    swatch: "#00554E",
    textClassName: "text-white",
  },
  {
    name: "Velocity Orange",
    rgb: "191/90/19",
    cmyk: "0/53/90/25",
    hex: "#BF5A13",
    swatch: "#BF5A13",
    textClassName: "text-white",
  },
];

const titaniumPalette = [
  {
    name: "Deep",
    pantone: "426 C",
    rgb: "44/47/51",
    cmyk: "70/60/55/65",
    hex: "#2C2F33",
    swatch: "#2C2F33",
    textClassName: "text-white",
  },
  {
    name: "Classic",
    pantone: "Cool Gray 9 C",
    rgb: "122/128/134",
    cmyk: "55/45/40/10",
    hex: "#7A8086",
    swatch: "#7A8086",
    textClassName: "text-white",
  },
  {
    name: "Natural",
    pantone: "7535 C",
    rgb: "189/184/176",
    cmyk: "25/23/30/0",
    hex: "#BDB8B0",
    swatch: "#BDB8B0",
    textClassName: "text-black",
  },
  {
    name: "Light",
    pantone: "656 C",
    rgb: "230/232/234",
    cmyk: "10/6/6/0",
    hex: "#E6E8EA",
    swatch: "#E6E8EA",
    textClassName: "text-black",
  },
  {
    name: "Raw",
    pantone: "424 C",
    rgb: "81/86/90",
    cmyk: "65/50/45/30",
    hex: "#51565A",
    swatch: "#51565A",
    textClassName: "text-white",
  },
];

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

function GridLine({ className }: { className: string }) {
  return <div className={`pointer-events-none absolute bg-white/65 ${className}`} />;
}

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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateMatch = () => setIsDesktop(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  return isDesktop;
}

type PaletteItem = (typeof corePalette)[number];

function PaletteStack({
  items,
  basisClassName,
  overlapClassName,
}: {
  items: PaletteItem[];
  basisClassName: string;
  overlapClassName: string;
}) {
  const [activePaletteIndex, setActivePaletteIndex] = useState<number | null>(null);
  const isDesktop = useIsDesktop();

  return (
    <motion.div
      {...revealSoft}
      transition={{ ...revealSoft.transition, delay: 0.08 }}
      className="mx-auto mt-10 max-w-[1280px] rounded-[1.9rem] md:mt-[30rem]"
    >
      <div className="relative flex flex-col gap-2 md:h-[170px] md:flex-row md:items-start md:gap-0">
        {items.map((item, index) => {
          const isActive = activePaletteIndex === index;
          const isOpen = isDesktop ? isActive : true;

          return (
            <motion.button
              key={item.name}
              type="button"
              onMouseEnter={() => setActivePaletteIndex(index)}
              onMouseLeave={() => setActivePaletteIndex(null)}
              onFocus={() => setActivePaletteIndex(index)}
              onBlur={() => setActivePaletteIndex(null)}
              onClick={() => setActivePaletteIndex(index)}
              initial={false}
              animate={{
                height: isDesktop ? (isActive ? 430 : 170) : 320,
                y: isDesktop && isActive ? -260 : 0,
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex min-h-[130px] w-full flex-col overflow-hidden rounded-t-[1.65rem] px-6 py-5 text-left outline-none md:min-h-0 ${basisClassName} md:px-8 md:py-7 lg:px-9 lg:py-8 ${item.textClassName} ${index > 0 ? overlapClassName : ""}`}
              style={{
                backgroundColor: item.swatch,
                zIndex: index + 1,
                transformOrigin: "bottom",
              }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-t-[1.65rem] ring-1 ring-white/8" />

              <h3 className="relative max-w-[10ch] text-[1.45rem] font-light leading-[0.92] tracking-normal opacity-80 md:text-[1.8rem] lg:text-[1.95rem]">
                {item.name}
              </h3>

              <motion.div
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none relative mt-auto space-y-5 md:space-y-6"
              >
                <div>
                  <p className="text-[1.1rem] font-light uppercase leading-none tracking-normal md:text-[1.3rem]">
                    RGB
                  </p>
                  <p className="mt-1 text-[1.1rem] font-light leading-none tracking-normal md:text-[1.3rem]">
                    {item.rgb}
                  </p>
                </div>

                <div>
                  <p className="text-[1.1rem] font-light uppercase leading-none tracking-normal md:text-[1.3rem]">
                    CMYK
                  </p>
                  <p className="mt-1 text-[1.1rem] font-light leading-none tracking-normal md:text-[1.3rem]">
                    {item.cmyk}
                  </p>
                </div>

                <div>
                  <p className="text-[1.1rem] font-light uppercase leading-none tracking-normal md:text-[1.3rem]">
                    HEX
                  </p>
                  <p className="mt-1 text-[1.1rem] font-light leading-none tracking-normal md:text-[1.3rem]">
                    {item.hex}
                  </p>
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

type TitaniumItem = (typeof titaniumPalette)[number];

function TitaniumStack({ items }: { items: TitaniumItem[] }) {
  const [activePaletteIndex, setActivePaletteIndex] = useState<number | null>(null);
  const isDesktop = useIsDesktop();

  return (
    <motion.div
      {...revealSoft}
      transition={{ ...revealSoft.transition, delay: 0.08 }}
      className="mx-auto mt-10 max-w-[1280px] rounded-[1.9rem] md:mt-[24rem]"
    >
      <div className="relative flex flex-col gap-2 md:h-[170px] md:flex-row md:items-start md:gap-0">
        {items.map((item, index) => {
          const isActive = activePaletteIndex === index;
          const isOpen = isDesktop ? isActive : true;

          return (
            <motion.button
              key={item.name}
              type="button"
              onMouseEnter={() => setActivePaletteIndex(index)}
              onMouseLeave={() => setActivePaletteIndex(null)}
              onFocus={() => setActivePaletteIndex(index)}
              onBlur={() => setActivePaletteIndex(null)}
              onClick={() => setActivePaletteIndex(index)}
              initial={false}
              animate={{
                height: isDesktop ? (isActive ? 520 : 170) : 430,
                y: isDesktop && isActive ? -350 : 0,
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex min-h-[130px] w-full flex-col overflow-hidden rounded-t-[1.65rem] px-6 py-5 text-left outline-none md:min-h-0 md:basis-[23.6%] md:px-8 md:py-7 lg:px-9 lg:py-8 ${item.textClassName} ${index > 0 ? "md:-ml-[4.5%]" : ""}`}
              style={{
                backgroundColor: item.swatch,
                zIndex: index + 1,
                transformOrigin: "bottom",
              }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-t-[1.65rem] ring-1 ring-white/8" />

              <h3 className="relative text-[1.45rem] font-light leading-none tracking-normal opacity-80 md:text-[1.8rem] lg:text-[1.95rem]">
                {item.name}
              </h3>

              <motion.div
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none relative mt-auto space-y-5 md:space-y-6"
              >
                <div>
                  <p className="text-[1.1rem] font-light leading-none tracking-normal md:text-[1.3rem]">
                    Pantone
                  </p>
                  <p className="mt-1 text-[1.1rem] font-light leading-none tracking-normal md:text-[1.3rem]">
                    {item.pantone}
                  </p>
                </div>

                <div>
                  <p className="text-[1.1rem] font-light uppercase leading-none tracking-normal md:text-[1.3rem]">
                    RGB
                  </p>
                  <p className="mt-1 text-[1.1rem] font-light leading-none tracking-normal md:text-[1.3rem]">
                    {item.rgb}
                  </p>
                </div>

                <div>
                  <p className="text-[1.1rem] font-light uppercase leading-none tracking-normal md:text-[1.3rem]">
                    CMYK
                  </p>
                  <p className="mt-1 text-[1.1rem] font-light leading-none tracking-normal md:text-[1.3rem]">
                    {item.cmyk}
                  </p>
                </div>

                <div>
                  <p className="text-[1.1rem] font-light uppercase leading-none tracking-normal md:text-[1.3rem]">
                    HEX
                  </p>
                  <p className="mt-1 text-[1.1rem] font-light leading-none tracking-normal md:text-[1.3rem]">
                    {item.hex}
                  </p>
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function ColorContent() {
  return (
    <main id="top" className="bg-[#e9eaef] text-black">
      <div className="mx-auto min-h-screen w-full max-w-[1728px] 2xl:max-w-none">
        <section className="relative h-screen min-h-[560px] overflow-hidden bg-[#020118] text-white max-md:h-[100svh] max-md:min-h-[640px] 2xl:min-h-[980px]">
          <div className="absolute inset-0">
            <GridLine className="left-[5.6%] top-0 h-full w-px max-md:left-[8%]" />
            <GridLine className="left-[36%] top-0 h-full w-px max-md:left-[52%]" />
            <GridLine className="left-[57.2%] top-0 h-full w-px max-md:hidden" />
            <GridLine className="left-[83.6%] top-0 h-full w-px max-md:hidden" />
            <GridLine className="left-0 top-[31.8%] h-px w-full" />
            <GridLine className="left-0 top-[66.5%] h-px w-full" />
            <GridLine className="left-0 top-[83.8%] h-px w-full max-md:top-[84.5%]" />
          </div>

          <motion.div
            {...revealSoft}
            className="absolute left-[7.2%] top-[9.8%] h-20 w-36 md:h-28 md:w-48 lg:h-32 lg:w-56 max-md:left-[14%] max-md:top-[11%] max-md:h-20 max-md:w-32 2xl:h-40 2xl:w-64"
          >
            <Link href="/brand" className="block h-full w-full">
              <Image
                src="/logos/gama-logo.png"
                alt="GAMA"
                fill
                priority
                sizes="(max-width: 768px) 128px, (min-width: 1536px) 288px, 256px"
                className="object-contain brightness-0 invert"
              />
            </Link>
          </motion.div>

          <motion.div
            {...revealSoft}
            transition={{ ...revealSoft.transition, delay: 0.08 }}
            className="absolute right-[17.6%] top-[24.5%] text-right text-xl font-light md:text-3xl max-md:right-[8%] max-md:top-[16%] max-md:text-sm 2xl:text-4xl"
          >
            Brand Guidelines
          </motion.div>

          <motion.h1
            {...revealUp}
            transition={{ ...revealUp.transition, delay: 0.12 }}
            className="absolute bottom-[33.2%] left-[6.5%] text-5xl font-black leading-[0.9] tracking-tight md:text-7xl lg:text-[6.4rem] max-md:bottom-[38%] max-md:left-[10%] max-md:text-[3.6rem] 2xl:text-[8.2rem]"
          >
            Color
          </motion.h1>

          <motion.div
            {...revealSoft}
            transition={{ ...revealSoft.transition, delay: 0.16 }}
            className="pointer-events-none absolute bottom-[-16%] right-[-8%] h-[60%] w-[60%] max-md:bottom-[-10%] max-md:right-[-22%] max-md:h-[46%] max-md:w-[96%]"
            aria-hidden="true"
          >
            <Image
              src="/brand/brand_color_image1.png"
              alt=""
              fill
              sizes="(max-width: 768px) 96vw, 60vw"
              className="object-contain object-bottom-right opacity-90 mix-blend-screen"
            />
          </motion.div>
        </section>

        <motion.section
          id="introduction"
          {...revealUp}
          className="scroll-mt-24 px-8 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20"
        >
          <div className="relative flex flex-col gap-12 md:min-h-[180px] md:flex-row md:items-start md:justify-between lg:min-h-[220px]">
            <motion.h2
              {...revealSoft}
              className="text-[1.3rem] font-black uppercase tracking-tight md:text-[1.5rem]"
            >
              Content
            </motion.h2>

            <div className="flex flex-col gap-2 text-left md:absolute md:left-[35%] md:top-0">
              {contentItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  {...revealSoft}
                  transition={{ ...revealSoft.transition, delay: index * 0.08 }}
                  className="text-[1.1rem] font-medium leading-[1.2] tracking-normal md:text-[1.35rem] lg:text-[1.55rem]"
                >
                  <a href={item.href} className="transition-opacity hover:opacity-60">
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="hidden w-24 md:block" />
          </div>

          <motion.div
            {...revealSoft}
            transition={{ ...revealSoft.transition, delay: 0.12 }}
            className="mx-auto mt-14 max-w-[1260px] overflow-hidden rounded-[1.75rem] md:mt-20 lg:mt-24 lg:rounded-[2rem]"
          >
            <div className="relative aspect-[16/7] min-h-[220px] w-full md:min-h-[420px]">
              <Image
                src="/brand/brand_color_image2.png"
                alt="GAMA color introduction visual"
                fill
                sizes="(max-width: 768px) 100vw, 1260px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          <motion.div
            {...revealUp}
            transition={{ ...revealUp.transition, delay: 0.16 }}
            className="mx-auto mt-12 max-w-[1180px] text-center md:mt-16 lg:mt-18"
          >
            <h2 className="text-[1.4rem] font-light leading-[1.08] tracking-[-0.04em] md:text-[2rem] lg:text-[3rem]">
              <TypewriterText text={introHeading} />
            </h2>
            <p className="mx-auto mt-8 max-w-[980px] text-[1rem] font-light leading-[1.05] tracking-[-0.04em] md:text-[1.6rem] lg:mt-10 lg:text-[2.4rem]">
              <TypewriterText text={introBody} />
            </p>
          </motion.div>
        </motion.section>

        <motion.section
          id="core-palette"
          {...revealUp}
          className="scroll-mt-24 px-8 pb-12 md:px-10 md:pb-16 lg:px-14 lg:pb-20"
        >
          <motion.div
            {...revealSoft}
            className="border-t border-black/80 pt-5 md:pt-6"
          >
            <h2 className="text-[1.3rem] font-black uppercase tracking-tight text-black/65 md:text-[1.5rem] mb-[-10rem]">
              Core Palette
            </h2>
          </motion.div>

          <PaletteStack
            items={corePalette}
            basisClassName="md:basis-[28.4%]"
            overlapClassName="md:-ml-[4.45%]"
          />
        </motion.section>

        <motion.section
          id="extended-palette"
          {...revealUp}
          className="scroll-mt-24 px-8 pb-12 md:px-10 md:pb-16 lg:px-14 lg:pb-20"
        >
          <motion.div
            {...revealSoft}
            className="border-t border-black/80 pt-5 md:pt-6"
          >
            <h2 className="text-[1.3rem] font-black uppercase tracking-tight text-black/65 md:text-[1.5rem] mb-[-10rem]">
              Extended Palette
            </h2>
          </motion.div>

          <PaletteStack
            items={extendedPalette}
            basisClassName="md:basis-[23.6%]"
            overlapClassName="md:-ml-[4.5%]"
          />
        </motion.section>

        <motion.section
          id="titaniums"
          {...revealUp}
          className="scroll-mt-24 px-8 pb-16 md:px-10 md:pb-20 lg:px-14 lg:pb-24"
        >
          <motion.div
            {...revealSoft}
            className="border-t border-black/80 pt-5 md:pt-6"
          >
            <h2 className="text-[1.3rem] font-black uppercase tracking-tight text-black/65 md:text-[1.5rem]">
              Titaniums
            </h2>
          </motion.div>

          <TitaniumStack items={titaniumPalette} />
        </motion.section>

        <motion.section
          {...revealUp}
          className="px-8 py-10 md:px-10 md:py-14 lg:px-14 lg:py-18"
        >
          <div className="border-t-2 border-black/90 pt-8 md:pt-10 lg:pt-12">
            <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:gap-6">
              <motion.div {...revealSoft}>
                <p className="text-lg font-black uppercase leading-none tracking-tight md:text-2xl">Back</p>
                <Link
                  href="/brand/logo"
                  className="mt-10 block text-3xl font-black leading-[0.95] tracking-tight hover:opacity-60 md:mt-20 md:text-6xl lg:text-7xl"
                >
                  Logo
                </Link>
              </motion.div>

              <motion.div
                {...revealSoft}
                transition={{ ...revealSoft.transition, delay: 0.06 }}
                className="text-left md:text-right"
              >
                <p className="text-lg font-black uppercase leading-none tracking-tight md:text-2xl">Next</p>
                <Link
                  href="/brand/typography"
                  className="mt-10 block text-3xl font-black leading-[0.95] tracking-tight hover:opacity-60 md:mt-20 md:text-6xl lg:text-7xl"
                >
                  Typography
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.footer
          {...revealUp}
          className="bg-[linear-gradient(135deg,#0b8fe8_0%,#63bdf2_100%)] px-8 py-10 text-white md:px-10 md:py-14 lg:px-14 lg:py-18"
        >
          <div className="max-w-[1600px]">
            <motion.p
              {...revealSoft}
              className="max-w-[1400px] text-base font-semibold leading-[1.12] tracking-normal md:text-2xl lg:text-3xl"
            >
              These guidelines were created by the The Gama Design— designers and writers responsible for cohesive and
              consistent use of our brand elements.
            </motion.p>

            <motion.p
              {...revealSoft}
              transition={{ ...revealSoft.transition, delay: 0.05 }}
              className="mt-9 text-base font-semibold leading-[1.12] tracking-normal md:mt-12 md:text-2xl lg:mt-14 lg:text-3xl"
            >
              If you have questions about using these guidelines, please contact:
            </motion.p>

            <motion.a
              {...revealSoft}
              transition={{ ...revealSoft.transition, delay: 0.08 }}
              href="mailto:brand@gamadrones.com"
              className="mt-1 block break-words text-2xl font-black leading-none tracking-normal text-white hover:opacity-80 md:text-5xl"
            >
              brand@gamadrones.com
            </motion.a>

            <motion.a
              {...revealSoft}
              transition={{ ...revealSoft.transition, delay: 0.1 }}
              href="#top"
              className="mt-14 inline-block text-base font-black underline decoration-[3px] underline-offset-4 hover:opacity-80 md:mt-18 md:text-xl lg:mt-24"
            >
              Back to top
            </motion.a>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
