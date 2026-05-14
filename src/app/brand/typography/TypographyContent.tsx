"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

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

const revealLongSection = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.02 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

const contentItems = ["Introduction", "Brand Typefaces", "Workspace Substitutes", "Usage Structure"];

const introStatement =
  "While our words define what we say, our typography defines how we say it. With our words, we conquer the skies.";

const brandTypefaces = [
  {
    label: "Main\nFont",
    name: "Marr Sans Condensed",
    sample: "ABCDEFGHIJKLMNOPSRTUVWYZ\n!@'$%&?1234567890",
    description:
      "To maintain strong visual hierarchy, deploy Marr Sans Condensed strictly for high-impact elements: primary headings and striking callouts.",
    width: "Bold",
    specimenClass: "font-black leading-[0.9] tracking-tight",
    nameClass: "text-3xl md:text-5xl lg:text-6xl",
    sampleClass: "text-xl md:text-3xl lg:text-4xl",
  },
  {
    label: "Auxiliary\nFont (1)",
    name: "TT Norms",
    sample: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\n!@'$%&?1234567890",
    description:
      "Acting as the bridge in our visual hierarchy, TT Norms is designated for secondary headings and engaging copy. It sustains momentum where standard body fonts might feel passive, making it the primary choice for dynamic social media content.",
    width: "Regular",
    specimenClass: "font-normal leading-[1.02] tracking-normal",
    nameClass: "text-4xl md:text-6xl lg:text-7xl",
    sampleClass: "text-lg md:text-3xl lg:text-4xl",
  },
  {
    label: "Auxiliary\nFont (2)",
    name: "Plain",
    sample: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\n!@'$%&?1234567890",
    description:
      "Plain is used for body text and reports and is optimized for long-term readability. It is preferred for long-form content, detailed documentation, and data-heavy materials, and may also be used in certain subheadings.",
    width: "Regular",
    specimenClass: "font-medium leading-[1.02] tracking-normal",
    nameClass: "text-4xl md:text-6xl lg:text-7xl",
    sampleClass: "text-lg md:text-3xl lg:text-4xl",
  },
];

const workspaceSubstitutes = [
  {
    eyebrow: "Heading 1 (Primary)",
    label: "Alternative for\nMarr Sans\nCondensed",
    name: "Archivo Condensed",
    sample: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\n!@'$%&?1234567890",
    weight: "900 (Black)",
    specimenClass: "font-black leading-[0.9] tracking-tight",
    nameClass: "text-4xl md:text-6xl lg:text-7xl",
    sampleClass: "text-lg md:text-3xl lg:text-4xl",
  },
  {
    eyebrow: "Heading 2 (Secondary)",
    label: "Alternative for\nTT Norms",
    name: "Outfit",
    sample: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\n!@'$%&?1234567890",
    weight: "400 (Regular)",
    specimenClass: "font-normal leading-[1.02] tracking-normal",
    nameClass: "text-5xl md:text-6xl lg:text-7xl",
    sampleClass: "text-lg md:text-3xl lg:text-4xl",
  },
  {
    eyebrow: "Heading 3 (Tertiary) & Smaller Copy",
    label: "Alternative for\nPlain",
    name: "Inter",
    sample: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\n!@'$%&?1234567890",
    weight: "400 (Regular)",
    specimenClass: "font-normal leading-[1.02] tracking-normal",
    nameClass: "text-5xl md:text-6xl lg:text-7xl",
    sampleClass: "text-lg md:text-3xl lg:text-4xl",
  },
];

const websiteHierarchy = [
  { label: "H1 Large", text: "A Rising Star", className: "text-6xl md:text-8xl lg:text-[8.5rem] font-black uppercase tracking-tight" },
  { label: "H1", text: "A Rising Star", className: "text-5xl md:text-7xl lg:text-[6.5rem] font-black uppercase tracking-tight" },
  { label: "H2", text: "A Rising Star", className: "text-4xl md:text-6xl lg:text-[5rem] font-black uppercase tracking-tight" },
  { label: "H3", text: "A Rising Star", className: "text-3xl md:text-5xl lg:text-[3.8rem] font-black uppercase tracking-tight" },
  { label: "H4", text: "A Rising Star", className: "text-2xl md:text-4xl lg:text-[2.6rem] font-black uppercase tracking-tight" },
  { label: "H5", text: "We became smaller", className: "text-2xl md:text-3xl lg:text-4xl font-normal uppercase tracking-normal" },
  { label: "Body.Large", text: "We do our best", className: "text-xl md:text-2xl lg:text-3xl font-medium" },
  { label: "Body.Medium", text: "We do our best", className: "text-lg md:text-xl lg:text-2xl font-medium" },
  { label: "Body.Small", text: "We do our best", className: "text-base md:text-lg lg:text-xl font-medium" },
  { label: "Body.XSmall", text: "We do our best", className: "text-sm md:text-base lg:text-lg font-medium" },
];

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

function TypefaceSpecimen({
  item,
  index,
}: {
  item: (typeof brandTypefaces)[number];
  index: number;
}) {
  return (
    <motion.div
      {...revealUp}
      transition={{ ...revealUp.transition, delay: index * 0.12 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-[160px_1fr] md:gap-10 lg:grid-cols-[220px_1fr] lg:gap-12"
    >
      <div className="pt-2 text-lg font-normal leading-[1.08] tracking-normal md:pt-16 md:text-2xl lg:text-3xl">
        {item.label.split("\n").map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </div>

      <div>
        <div className="border border-dashed border-black px-5 py-6 md:px-8 md:py-9 lg:px-10 lg:py-10">
          <h3 className={`${item.specimenClass} ${item.nameClass}`}>{item.name}</h3>
          <p className={`mt-6 whitespace-pre-line ${item.specimenClass} ${item.sampleClass}`}>{item.sample}</p>
        </div>

        <div className="mt-6 max-w-[980px] text-sm font-medium leading-[1.08] tracking-normal md:mt-8 md:text-lg lg:text-xl">
          <p>{item.description}</p>
          <p className="mt-6">Width: {item.width}</p>
        </div>
      </div>
    </motion.div>
  );
}

function SubstituteSpecimen({
  item,
  index,
}: {
  item: (typeof workspaceSubstitutes)[number];
  index: number;
}) {
  return (
    <motion.div
      {...revealUp}
      transition={{ ...revealUp.transition, delay: index * 0.12 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] md:gap-10 lg:grid-cols-[260px_1fr] lg:gap-12"
    >
      <div className="pt-8 text-xl font-normal leading-[1.15] tracking-normal md:pt-28 md:text-2xl lg:text-3xl">
        {item.label.split("\n").map((line, lineIndex) => (
          <span key={`${line}-${lineIndex}`} className={lineIndex > 0 ? "block font-black" : "block"}>
            {line}
          </span>
        ))}
      </div>

      <div>
        <p className="mb-3 text-lg font-black uppercase leading-none tracking-tight md:text-xl lg:text-2xl">
          {item.eyebrow}
        </p>
        <div className="border border-dashed border-black px-5 py-6 md:px-8 md:py-8 lg:px-10 lg:py-9">
          <h3 className={`${item.specimenClass} ${item.nameClass}`}>{item.name}</h3>
          <p className={`mt-6 whitespace-pre-line ${item.specimenClass} ${item.sampleClass}`}>{item.sample}</p>
        </div>
        <p className="mt-6 text-base font-medium leading-none tracking-normal md:text-lg lg:text-xl">
          Weight: {item.weight}
        </p>
      </div>
    </motion.div>
  );
}

function MeasurementGuide({
  label,
  className = "",
  labelClassName = "text-4xl",
}: {
  label: string;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <div className={`grid grid-cols-[90px_1fr] items-center gap-10 ${className}`}>
      <div className="relative h-full">
        <div className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[9px] border-x-transparent border-t-black" />
        <div className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-b-[9px] border-x-transparent border-b-black" />
        <div className="mx-auto h-full w-px bg-[repeating-linear-gradient(to_bottom,#000_0_3px,transparent_3px_7px)]" />
      </div>
      <p className={`${labelClassName} font-normal`}>{label}</p>
    </div>
  );
}

export default function TypographyContent() {
  return (
    <main id="top" className="bg-[#e9eaef] text-black">
      <div className="mx-auto min-h-screen w-full max-w-[1728px] 2xl:max-w-none">
        <section className="relative h-screen min-h-[560px] overflow-hidden bg-[#0874df] text-white max-md:h-[100svh] max-md:min-h-[640px] 2xl:min-h-[980px]">
          <div className="absolute inset-0">
            <GridLine className="left-[5.6%] top-0 h-full w-px max-md:left-[8%]" />
            <GridLine className="left-[42.2%] top-0 h-full w-px max-md:left-[50%]" />
            <GridLine className="left-[62.1%] top-0 h-full w-px max-md:hidden" />
            <GridLine className="left-[68.8%] top-[33%] h-[33.5%] w-px max-md:hidden" />
            <GridLine className="left-[75.6%] top-0 h-full w-px max-md:hidden" />
            <GridLine className="left-0 top-[33%] h-px w-full" />
            <GridLine className="left-0 top-[66.4%] h-px w-full" />
            <GridLine className="left-0 top-[83%] h-px w-[42.2%] max-md:top-[84%] max-md:w-full" />
            <GridLine className="left-[62.1%] top-[83%] h-px w-full max-md:hidden" />
          </div>

          <div className="absolute left-0 top-0 h-[33%] w-[5.6%] bg-[#b6ec00] max-md:w-[8%]" />
          <div className="absolute left-[42.2%] top-0 hidden h-[33%] w-[19.9%] bg-[#f6f6f4] md:block" />
          <div className="absolute right-0 top-[66.4%] h-[16.6%] w-[24.4%] bg-[#b6ec00] max-md:top-[68%] max-md:h-[16%] max-md:w-[24%]" />
          <div className="absolute bottom-0 left-[42.2%] h-[33.6%] w-[19.9%] bg-[#062f55] max-md:left-[50%] max-md:h-[30%] max-md:w-[24%]" />
          <div className="absolute bottom-0 left-0 h-[17%] w-[5.6%] bg-[#f6f6f4] max-md:h-[15.5%] max-md:w-[14%]" />

          <motion.div
            {...revealSoft}
            className="absolute left-[4.5%] top-[8%] h-24 w-40 md:h-32 md:w-52 lg:h-40 lg:w-64 max-md:left-[17%] max-md:top-[10%] max-md:h-20 max-md:w-32 2xl:h-48 2xl:w-72"
          >
            <Image
              src="/logos/gama-logo.png"
              alt="GAMA"
              fill
              priority
              sizes="(max-width: 768px) 128px, (min-width: 1536px) 288px, 256px"
              className="object-contain brightness-0 invert"
            />
          </motion.div>

          <motion.p
            {...revealUp}
            transition={{ ...revealUp.transition, delay: 0.05 }}
            className="absolute left-[44%] top-8 hidden w-[16%] text-center text-xl font-black leading-[1.18] text-[#ff4a0a] md:block lg:text-[1.6rem] max-lg:left-[40%] max-lg:w-[24%] max-lg:text-lg 2xl:text-[2rem]"
          >
            Gama is a place that even has its own language skills. Looking for elegant engineers? This is the place...
          </motion.p>

          <motion.div
            {...revealSoft}
            transition={{ ...revealSoft.transition, delay: 0.12 }}
            className="absolute right-[6%] top-[18%] text-xl font-light md:text-3xl max-md:right-[9%] max-md:top-[10%] max-md:text-sm 2xl:text-4xl"
          >
            Brand Guidelines
          </motion.div>

          <motion.h1
            {...revealUp}
            transition={{ ...revealUp.transition, delay: 0.14 }}
            className="absolute bottom-[33%] left-[6.5%] text-4xl font-black leading-none tracking-normal md:text-6xl lg:text-7xl max-md:bottom-[39.4%] max-md:left-[10%] max-md:text-[1.85rem] 2xl:text-8xl"
          >
            Typography
          </motion.h1>

          <motion.div
            {...revealSoft}
            transition={{ ...revealSoft.transition, delay: 0.18 }}
            className="absolute left-[65%] top-[43.3%] hidden h-40 w-20 md:block lg:h-56 lg:w-28 max-md:left-[58%] max-md:top-[43.3%] max-md:block max-md:h-36 max-md:w-[4.5rem] 2xl:left-[64.3%] 2xl:top-[38%] 2xl:h-[28rem] 2xl:w-56"
            aria-hidden="true"
          >
            <Image
              src="/brand/typography-pen-icon.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 72px, (min-width: 1536px) 224px, 112px"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            {...revealSoft}
            transition={{ ...revealSoft.transition, delay: 0.22 }}
            className="absolute bottom-4 left-2 text-2xl font-black leading-[0.95] text-[#ff4a0a] md:bottom-5 md:left-2 md:text-3xl max-md:bottom-10 max-md:left-2 max-md:text-[0.78rem] 2xl:text-4xl"
            aria-hidden="true"
          >
            !@#$
            <br />
            %&*
            <br />
            ()-“”&#123;
            <br />
            &#125;+?
          </motion.div>

          <motion.div
            {...revealSoft}
            transition={{ ...revealSoft.transition, delay: 0.26 }}
            className="absolute bottom-[-82px] left-[45%] hidden text-[12rem] font-black leading-none text-[#0874df] [text-shadow:-7px_0_0_#050505,0_-7px_0_#050505,7px_0_0_#050505,0_7px_0_#050505] md:block lg:bottom-[-104px] lg:text-[15rem] max-md:bottom-[-38px] max-md:left-[54%] max-md:block max-md:text-[5.6rem] max-md:[text-shadow:-4px_0_0_#050505,0_-4px_0_#050505,4px_0_0_#050505,0_4px_0_#050505] 2xl:bottom-[-140px] 2xl:text-[20rem]"
            aria-hidden="true"
          >
            G
          </motion.div>

        </section>

        <motion.section
          {...revealUp}
          className="min-h-[720px] px-8 py-12 md:min-h-[820px] md:px-10 md:py-16 lg:min-h-[960px] lg:px-14 lg:py-20"
        >
          <div className="relative flex flex-col gap-12 md:min-h-[210px] md:flex-row md:items-start md:justify-between lg:min-h-[300px]">
            <motion.h2 {...revealSoft} className="text-[1.3rem] font-black uppercase tracking-tight md:text-[1.5rem]">
              Content
            </motion.h2>

            <div className="flex flex-col gap-2 text-left md:absolute md:left-[36%] md:top-0">
              {contentItems.map((item, index) => (
                <motion.div
                  key={item}
                  {...revealSoft}
                  transition={{ ...revealSoft.transition, delay: index * 0.1 }}
                  className="text-[1.1rem] font-medium leading-[1.2] tracking-normal md:text-[1.3rem]"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="hidden w-24 md:block" />
          </div>

          <motion.div
            {...revealUp}
            transition={{ ...revealUp.transition, delay: 0.12 }}
            className="mt-4 flex justify-center text-center md:mt-8 lg:mt-4"
          >
            <h2 className="max-w-[1200px] text-[1.3rem] pt-10 font-extralight leading-[1.2] tracking-tight md:text-[2.4rem] lg:text-[3.5rem]">
              <TypewriterText text={introStatement} />
            </h2>
          </motion.div>

          <motion.div {...revealSoft} className="mt-14 border-b-2 border-black/90 md:mt-20 lg:mt-24" />
        </motion.section>

        <motion.section
          {...revealUp}
          className="px-8 pb-2 pt-5 md:px-10 md:pb-3 md:pt-3 lg:px-14 lg:pb-4 lg:pt-3"
        >
          <div className="mx-auto max-w-[1600px]">
            <motion.h2
              {...revealSoft}
              className="text-[1.3rem] font-black uppercase tracking-tight md:text-[1.5rem]"
            >
              Brand Typefaces
            </motion.h2>

            <motion.div
              {...revealSoft}
              transition={{ ...revealSoft.transition, delay: 0.08 }}
              className="mt-8 max-w-[680px] space-y-4 text-base font-medium leading-[1.05] tracking-normal md:mt-10 md:text-xl lg:text-2xl"
            >
              <p>
                Three font families are used across all of our communications: Marr Sans Condensed, TT Norms, and Plain.
              </p>
              <p>We considered our choice carefully, believing that what pleases the eye ultimately resonates with the heart.</p>
            </motion.div>

            <div className="mt-16 space-y-18 md:mt-24 md:space-y-24 lg:mt-36 lg:space-y-36">
              {brandTypefaces.map((item, index) => (
                <TypefaceSpecimen key={item.name} item={item} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          {...revealLongSection}
          className="px-8 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20"
        >
          <div className="mx-auto max-w-[1600px] border-t-2 border-black/90 pt-6 md:pt-8">
            <motion.h2
              {...revealSoft}
              className="text-[1.3rem] font-black uppercase tracking-tight md:text-[1.5rem]"
            >
              Workspace Substitutes
            </motion.h2>

            <motion.p
              {...revealSoft}
              transition={{ ...revealSoft.transition, delay: 0.08 }}
              className="mt-8 max-w-[980px] text-base font-medium leading-[1.08] tracking-normal md:text-xl lg:text-2xl"
            >
              For internal documentation, collaborative platforms (Docs, Slides, Sheets), and instances where our
              primary brand typefaces cannot be natively deployed, these serve as the substitute fonts. This ensures
              visual consistency across all operational workflows.
            </motion.p>

            <div className="mt-20 space-y-24 md:mt-28 md:space-y-28 lg:mt-36 lg:space-y-36">
              {workspaceSubstitutes.map((item, index) => (
                <SubstituteSpecimen key={item.name} item={item} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          {...revealLongSection}
          className="px-8 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20"
        >
          <div className="mx-auto max-w-[1600px] border-t-2 border-black/90 pt-6 md:pt-8">
            <motion.h2
              {...revealSoft}
              className="text-[1.3rem] font-black uppercase tracking-tight md:text-[1.5rem]"
            >
              Usage Structure
            </motion.h2>

            <motion.div
              {...revealSoft}
              transition={{ ...revealSoft.transition, delay: 0.08 }}
              className="mt-8 max-w-[980px] space-y-5 text-base font-medium leading-[1.08] tracking-normal md:text-xl lg:text-2xl"
            >
              <p>
                Document and text structures will appear more magnificent and elegant thanks to typography. To achieve
                this, it is recommended to use Plain (Regular) in documents, be careful when arranging the sub-headline
                and main headline structure, and follow the layout provided below.
              </p>
              <p>
                This structure should be followed in Engineering Documents (non-standardized documents written in report
                format) or Brochure texts.
              </p>
            </motion.div>

            <motion.div
              {...revealUp}
              transition={{ ...revealUp.transition, delay: 0.12 }}
              className="mt-20 border border-black px-6 py-8 md:mt-28 md:px-10 md:py-12 lg:mt-36 lg:px-14 lg:py-16"
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px] lg:gap-x-14 lg:gap-y-8">
                <h3 className="text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl lg:text-[7rem]">
                  The Sky
                </h3>
                <div className="hidden lg:block">
                  <MeasurementGuide label="Header or Main Title" className="h-full min-h-[112px]" />
                </div>

                <p className="mt-9 text-2xl font-normal leading-[1.08] tracking-normal md:text-4xl lg:mt-0 lg:text-5xl">
                  The sky is free for all of us
                </p>
                <div className="hidden lg:block">
                  <MeasurementGuide label="Sub-header" className="h-full min-h-[58px]" />
                </div>

                <div className="mt-8 max-w-[720px] space-y-6 text-base font-medium leading-[1.08] tracking-normal md:text-xl lg:mt-0 lg:text-2xl">
                  <p>
                    The sky, adorned with the lightest shades of blue by day and the shimmer of stars by night, cannot
                    be restricted by any earthly boundaries. This infinite void, which anyone can see just by lifting
                    their head, is the purest symbol of justice and freedom.
                  </p>
                  <p>
                    Sunlight filtering through the clouds reaches every corner of the world with the same warmth.
                    Regardless of being rich or poor, this magnificent spectacle of nature begins anew for each of us
                    every single day.
                  </p>
                  <p>
                    Under this vast ceiling, we all breathe the same air and gaze at the same horizon. The sky reminds
                    us every moment, despite all our differences, of just how large and common a whole we are a part of,
                    Gama Drones.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <MeasurementGuide label="Body copy" className="h-full min-h-[360px]" />
                </div>
              </div>
            </motion.div>

            <div className="mt-20 space-y-20 md:mt-28 md:space-y-28 lg:mt-36 lg:space-y-36">
              <motion.div
                {...revealUp}
                transition={{ ...revealUp.transition, delay: 0.14 }}
                className="border-t border-dotted border-black pt-8 md:pt-12"
              >
                <h3 className="text-3xl font-normal leading-none tracking-normal md:text-5xl lg:text-6xl">Headline 1</h3>
                <p className="mt-8 max-w-[1220px] text-base font-medium leading-[1.08] tracking-normal md:mt-12 md:text-xl lg:text-2xl">
                  Marr Sans typeface should be used for primary headings in full uppercase, with a size range between
                  130-150 pt. This approach is preferred to convey the emotional intensity and expressive character of
                  our brand.
                </p>

                <div className="mt-14 border border-black px-6 py-10 md:px-10 md:py-14 lg:px-16 lg:py-18">
                  <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_430px] lg:gap-16">
                    <p className="text-6xl font-black uppercase leading-[0.9] tracking-tight md:text-8xl lg:text-[8.5rem]">
                      The Sky
                    </p>
                    <div className="hidden h-56 lg:block">
                      <MeasurementGuide
                        label="Header or Main Title"
                        className="h-full"
                        labelClassName="text-3xl"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...revealUp}
                transition={{ ...revealUp.transition, delay: 0.18 }}
                className="border-t border-dotted border-black pt-8 md:pt-12"
              >
                <h3 className="text-3xl font-normal leading-none tracking-normal md:text-5xl lg:text-6xl">Headline 2</h3>
                <p className="mt-8 max-w-[1220px] text-base font-medium leading-[1.08] tracking-normal md:mt-12 md:text-xl lg:text-2xl">
                  TT Norms typeface may be used for subheadings or to highlight key points. It should be written either
                  in full uppercase or in sentence case with only the initial letter capitalized. The recommended size
                  range is between 43-60 pt.
                </p>

                <div className="mt-14 border border-black px-6 py-10 md:px-10 md:py-14 lg:px-16 lg:py-18">
                  <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_430px] lg:gap-16">
                    <p className="text-3xl font-normal leading-[1.08] tracking-normal md:text-5xl lg:text-6xl">
                      The sky is free for all of us
                    </p>
                    <div className="hidden h-24 lg:block">
                      <MeasurementGuide label="Sub-header" className="h-full" labelClassName="text-3xl" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...revealUp}
                transition={{ ...revealUp.transition, delay: 0.22 }}
                className="border-t border-dotted border-black pt-8 md:pt-12"
              >
                <h3 className="text-3xl font-normal leading-none tracking-normal md:text-5xl lg:text-6xl">
                  Bodycopy Style
                </h3>
                <p className="mt-8 max-w-[1320px] text-base font-medium leading-[1.08] tracking-normal md:mt-12 md:text-xl lg:text-2xl">
                  Thoughtful body copy typesetting makes text blocks look better, but more importantly, it makes them
                  easier to read. Use Plain Regular Bold for subheadlines and Plain Regular or light for all long form
                  copy.
                </p>

                <div className="mt-14 border border-black px-6 py-10 md:px-10 md:py-14 lg:px-16 lg:py-18">
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_430px] lg:gap-16">
                    <div className="max-w-[900px]">
                      <p className="text-xl font-black leading-[1.08] tracking-normal md:text-2xl lg:text-3xl">
                        Are Gama’s Takeoff?
                      </p>
                      <div className="mt-8 max-w-[720px] space-y-6 text-base font-medium leading-[1.08] tracking-normal md:text-xl lg:text-2xl">
                        <p>
                          The sky, adorned with the lightest shades of blue by day and the shimmer of stars by night,
                          cannot be restricted by any earthly boundaries. This infinite void, which anyone can see just
                          by lifting their head, is the purest symbol of justice and freedom.
                        </p>
                        <p>
                          Sunlight filtering through the clouds reaches every corner of the world with the same warmth.
                          Regardless of being rich or poor, this magnificent spectacle of nature begins anew for each of
                          us every single day.
                        </p>
                        <p>
                          Under this vast ceiling, we all breathe the same air and gaze at the same horizon. The sky
                          reminds us every moment, despite all our differences, of just how large and common a whole we
                          are a part of, Gama Drones.
                        </p>
                      </div>
                    </div>

                    <div className="hidden h-[520px] lg:block">
                      <MeasurementGuide label="Body copy" className="h-full" labelClassName="text-3xl" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...revealUp}
                transition={{ ...revealUp.transition, delay: 0.26 }}
                className="border-t border-dotted border-black pt-8 md:pt-12"
              >
                <h3 className="text-3xl font-normal leading-none tracking-normal md:text-5xl lg:text-6xl">
                  Website Hierarchy
                </h3>
                <p className="mt-8 max-w-[1160px] text-sm font-medium leading-[1.12] tracking-normal md:mt-10 md:text-base lg:text-lg">
                  Typography is one of the fundamental tools that shapes how information is perceived. A clear hierarchy
                  between headings, subheadings, body text, and supporting elements allows information to be quickly
                  understood and helps readers navigate content with ease. Elements such as size, weight, and spacing
                  guide the reader’s attention and make the structure of the text visible. This approach not only
                  creates an organized reading experience but also reflects our brand’s visual language in a consistent
                  and confident way.
                </p>

                <div className="mt-16 divide-y divide-black/70 border-b border-black/70 md:mt-20 lg:mt-24">
                  {websiteHierarchy.map((item, index) => (
                    <motion.div
                      key={item.label}
                      {...revealUp}
                      transition={{ ...revealUp.transition, delay: index * 0.05 }}
                      className="grid grid-cols-[110px_1fr] items-center gap-6 py-8 md:grid-cols-[170px_1fr] md:gap-10 lg:grid-cols-[220px_1fr] lg:py-10"
                    >
                      <p className="text-sm font-black uppercase leading-none tracking-tight md:text-base">
                        {item.label}
                      </p>
                      <p className={item.className}>{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          {...revealUp}
          className="px-8 py-10 md:px-10 md:py-14 lg:px-14 lg:py-18"
        >
          <div className="border-t-2 border-black/90 pt-8 md:pt-10 lg:pt-12">
            <div className="flex items-start justify-between gap-6">
              <motion.div {...revealSoft}>
                <p className="text-lg font-black uppercase leading-none tracking-tight md:text-2xl">Back</p>
                <Link
                  href="/brand/color"
                  className="mt-16 block text-4xl font-black leading-[0.95] tracking-tight hover:opacity-60 md:mt-20 md:text-6xl lg:text-7xl"
                >
                  Color
                </Link>
              </motion.div>

              <motion.div
                {...revealSoft}
                transition={{ ...revealSoft.transition, delay: 0.06 }}
                className="text-right"
              >
                <p className="text-lg font-black uppercase leading-none tracking-tight md:text-2xl">Next</p>
                <Link
                  href="/brand/voice-tone"
                  className="mt-16 block text-4xl font-black leading-[0.95] tracking-tight hover:opacity-60 md:mt-20 md:text-6xl lg:text-7xl"
                >
                  Voice &amp; Tone
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
              className="mt-1 block text-3xl font-black leading-none tracking-normal text-white hover:opacity-80 md:text-5xl"
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
