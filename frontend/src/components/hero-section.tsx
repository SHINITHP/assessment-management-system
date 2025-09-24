"use client";
import React from "react";
import { TextEffect } from "@/components/ui/text-effect";
import { Variants } from "framer-motion";

const transitionVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { type: "spring", bounce: 0.3, duration: 1.5 },
  },
};

export const HeroSection: React.FC = () => {
  return (
    <>
      <main className="overflow-hidden h-screen flex justify-center items-center">
        <section>
          <div className="relative">
            {/* Hero content */}
            <div className="mx-auto max-w-7xl text-center sm:mx-auto lg:mr-auto lg:mt-0">
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="mx-auto max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl xl:text-[5.25rem]"
              >
                Advanced Tools for Medical Assessment Management
              </TextEffect>

              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-8 max-w-2xl text-balance text-lg"
              >
                Customizable solutions to streamline medical assessments,
                enhancing patient care with intuitive interfaces and precise
                workflows.
              </TextEffect>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
