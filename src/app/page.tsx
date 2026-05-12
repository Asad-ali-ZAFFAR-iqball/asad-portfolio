import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { EducationSection } from "@/components/sections/Education";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

/**
 * Main portfolio page — composes all sections in order.
 * All sections are client components for rich interactivity;
 * this page itself is a server component for optimal initial load.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <EducationSection />
      <Testimonials />
      <Contact />
    </>
  );
}
