import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { EXPERIENCE, SKILLS } from "../data/constants";

const Experience = () => {
  return (
    <section id="experience" className="section-padding relative z-10 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Experience"
          subtitle="My professional journey."
        />

        <div className="relative">
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)] md:-translate-x-px" />

          {EXPERIENCE.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden md:block md:w-1/2" />

              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-[#915EFF] border-4 border-[var(--bg-primary)] z-10 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{job.id}</span>
              </div>

              <div
                className={`ml-14 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                }`}
              >
                <div className="exp-card">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-[#915EFF] text-sm font-semibold">
                      {job.startDate} – {job.endDate}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                    {job.title}
                  </h3>
                  <p className="text-[var(--text-muted)] font-medium mb-2">
                    {job.company}
                  </p>

                  {job.project && (
                    <p className="text-[var(--text-secondary)] text-sm italic mb-4">
                      <span className="text-[#915EFF] font-semibold not-italic">
                        {job.project}
                      </span>
                      {job.projectTech?.length > 0 && (
                        <span className="text-[var(--text-muted)]">
                          {" "}
                          — {job.projectTech.join(", ")}
                        </span>
                      )}
                    </p>
                  )}

                  <ul className="space-y-2 mb-6">
                    {job.description.map((item, i) => (
                      <li
                        key={i}
                        className="text-[var(--text-secondary)] text-sm leading-relaxed flex gap-2"
                      >
                        <span className="text-[#915EFF] mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {(job.skillTags || []).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                    {job.skills?.map((skillKey) => {
                      const skill = SKILLS[skillKey];
                      if (!skill) return null;
                      return (
                        <span
                          key={skillKey}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-muted)]"
                        >
                          <img
                            src={skill.icon}
                            alt=""
                            className="w-3.5 h-3.5 object-contain"
                          />
                          {skill.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
