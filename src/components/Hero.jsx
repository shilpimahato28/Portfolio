import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import config from "../data/config";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="stars" />
        <div className="stars2" />
        <div className="stars3" />
        <div className="hero-glow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col justify-center px-6 sm:px-8 pt-28 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[var(--text-muted)] text-lg sm:text-xl font-semibold mb-4"
        >
          Hi, I am
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-black text-[var(--text-primary)] text-[60px] sm:text-[90px] lg:text-[120px] leading-[0.95] tracking-tight"
        >
          {config.name.split(" ")[0]}
          <br />
          <span className="text-[#915EFF]">
            {config.name.split(" ")[1]}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-[var(--text-secondary)] text-lg sm:text-xl max-w-xl mt-6 leading-relaxed"
        >
          {config.role}
          <br />
          <span className="text-[var(--text-muted)]">
            {config.tagline}
          </span>
          <br />
          <span className="text-[var(--text-muted)] text-base mt-2 inline-block">
            {config.location} · B.Tech CSE · CGPA 8.91
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 max-w-md"
        >
          {/* Resume Button */}
          <a
            href="https://drive.google.com/file/d/11T9Ai0_ZXYBGzVGSZRL98zdUH5d08jhJ/view?usp=drive_link"
            target="_blank"
            rel="noreferrer"
            className="hero-btn-primary"
          >
            <FaFileAlt />
            Resume
          </a>

          <div className="flex gap-3">
            <a
              href="#contact"
              className="hero-btn-secondary flex-1 text-center"
            >
              Hire Me
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/shilpimahato28"
              target="_blank"
              rel="noreferrer"
              className="hero-btn-icon"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/shilpi-mahato-50804b300"
              target="_blank"
              rel="noreferrer"
              className="hero-btn-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center z-20">
        <a href="#skills" aria-label="Scroll to tech stack">
          <div className="scroll-indicator">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="scroll-dot"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;