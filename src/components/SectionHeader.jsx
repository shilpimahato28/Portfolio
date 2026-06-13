import { motion } from "framer-motion";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[var(--text-muted)] text-lg md:text-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
