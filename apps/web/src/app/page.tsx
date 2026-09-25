import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { getProfile, getSkills, getWork } from "@/lib/api";

// Render on each request so the page always reflects the API.
// Switch to ISR (`export const revalidate = 300`) once the API is hosted.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, skills, work] = await Promise.all([getProfile(), getSkills(), getWork()]);

  return (
    <>
      <Nav name={profile.name} />
      <main className="overflow-x-clip">
        <Hero profile={profile} />
        <About profile={profile} />
        <Work items={work} />
        <Skills categories={skills} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
