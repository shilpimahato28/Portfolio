import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import SectionHeader from "./SectionHeader";
import { ACHIEVEMENTS } from "../data/constants";

const Achievements = () => {
  return (
    <section id="achievements" className="section-padding relative z-10 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Achievements" subtitle="Highlights and milestones." />

        <div className="grid sm:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[#915EFF]/40 transition"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[#915EFF]/15 flex items-center justify-center text-[#915EFF]">
                <FaTrophy />
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
