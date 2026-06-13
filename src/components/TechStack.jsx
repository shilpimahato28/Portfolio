import SectionHeader from "./SectionHeader";
import { SKILL_CATEGORIES } from "../data/constants";

const TechStack = () => {
  return (
    <section id="skills" className="relative min-h-screen section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Tech Stack"
subtitle={
  <>
    Technologies and tools I work with
    <br />
    <span className="text-sm text-[var(--text-muted)]">
      (*hint: press any key)
    </span>
  </>
}

        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-sm"
            >
              <h3 className="text-[#915EFF] font-bold text-sm uppercase tracking-wider mb-3">
                {cat.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-lg text-xs bg-[var(--bg-elevated)] text-[var(--text-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;