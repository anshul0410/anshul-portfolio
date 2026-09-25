import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { getProfile, getSkills, getWork } from "@/lib/api";

// Incremental static regeneration: serve a cached page instantly and refresh it
// from the API in the background at most every 5 minutes. Visitors never wait
// on a sleeping API, and if a refresh fails the last good page keeps serving.
export const revalidate = 300;

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
