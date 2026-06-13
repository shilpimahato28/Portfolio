import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { EDUCATION } from "../data/constants";

const Education = () => {
  return (
    <section id="education" className="section-padding relative z-10 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Education" subtitle="Academic background." />

        <div className="grid gap-6">
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="exp-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                  {edu.degree}
                </h3>
                <p className="text-[var(--text-muted)] font-medium">
                  {edu.institution}
                </p>
              </div>
              <div className="flex flex-col sm:items-end gap-1 shrink-0">
                <span className="text-[#915EFF] text-sm font-semibold">
                  {edu.startDate} – {edu.endDate}
                </span>
                <span className="text-[var(--text-secondary)] text-sm font-medium">
                  {edu.gpa}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
