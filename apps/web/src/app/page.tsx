import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Skills } from "@/components/Skills";
import { getProfile, getSkills } from "@/lib/api";

// Render on each request so the page always reflects the API.
// Switch to ISR (`export const revalidate = 300`) once the API is hosted.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, skills] = await Promise.all([getProfile(), getSkills()]);

  return (
    <>
      <Nav name={profile.name} />
      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills categories={skills} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
