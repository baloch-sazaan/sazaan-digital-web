import { Reveal, SectionLabel } from './Primitives';
import IconCloud from './ui/icon-cloud';

const slugs = [
  { name: "TypeScript", color: "#3178C6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#339933" },
  { name: "HTML5", color: "#E34F26" },
  { name: "CSS3", color: "#1572B6" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "Firebase", color: "#FFCA28" },
  { name: "Docker", color: "#2496ED" },
  { name: "Git", color: "#F05032" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Vercel", color: "#ffffff" },
  { name: "AWS", color: "#FF9900" },
  { name: "Prisma", color: "#2D3748" },
  { name: "Express", color: "#ffffff" },
  { name: "GitHub", color: "#ffffff" },
  { name: "Jest", color: "#C21325" },
  { name: "Cypress", color: "#69D3A7" },
  { name: "Flutter", color: "#02569B" },
  { name: "Nginx", color: "#009639" },
  { name: "Sonar", color: "#4E9BCD" },
  { name: "GitLab", color: "#FC6D26" },
];

export const TechStackSection = () => {
  return (
    <section className="section bg-[#050505] overflow-hidden relative py-20 lg:py-40 border-t border-white/5">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,176,124,0.1),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      <div className="noise opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <SectionLabel center>Our Tech Stack</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mt-6">
              <span className="text-white">Cutting edge.</span><br />
              <span className="text-orange-light serif italic lowercase">Always.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative flex size-full max-w-lg mx-auto items-center justify-center overflow-hidden bg-transparent pt-8">
            <IconCloud iconSlugs={[
              "typescript", "javascript", "react", "nextdotjs", "nodedotjs", 
              "html5", "css3", "tailwindcss", "postgresql", "firebase", 
              "docker", "git", "figma", "vercel", "amazonaws", "prisma",
              "github", "flutter", "nginx", "visualstudiocode"
            ]} />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TechStackSection;
