"use client";

import Image from "next/image";
import Link from "next/link";

type BrandComingSoonContentProps = {
  title?: string;
};

export default function BrandComingSoonContent({ title }: BrandComingSoonContentProps) {
  return (
    <main className="min-h-screen bg-[#e9eaef] px-0 pt-0">
      <section className="relative flex min-h-screen w-full items-start justify-center px-6 pt-0 md:px-10 lg:px-14">
        <Link
          href="/brand"
          className="absolute left-6 top-6 z-10 text-sm font-black uppercase tracking-tight text-black underline decoration-2 underline-offset-4 hover:opacity-60 md:left-10 md:top-8 md:text-base lg:left-14"
        >
          Back to Brand
        </Link>

        <div className="flex h-screen w-full max-w-[92vw] flex-col items-center self-start md:max-w-[72vw] lg:max-w-[980px]">
          <div className="relative h-[84vh] w-full" aria-label={title}>
            <Image
              src="/brand/ordek.svg"
              alt={title ? `${title} placeholder` : "Brand placeholder"}
              fill
              priority
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 72vw, 980px"
              className="object-contain object-top"
            />
          </div>

          <p className="-mt-2 text-center text-base font-semibold tracking-tight text-black md:text-lg">
            This page is currently under maintenance.
          </p>
        </div>
      </section>
    </main>
  );
}
