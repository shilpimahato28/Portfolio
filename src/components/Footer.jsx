import config from "../data/config";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-10 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[var(--text-muted)] text-sm">
          © {year} {config.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href={config.social.github}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-muted)] hover:text-[#915EFF] transition text-xl"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={config.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-muted)] hover:text-[#915EFF] transition text-xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={`mailto:${config.email}`}
            className="text-[var(--text-muted)] hover:text-[#915EFF] transition text-xl"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        <div className="flex gap-6 text-sm">
          <a href="#skills" className="text-[var(--text-muted)] hover:text-[#915EFF] transition">
            Tech Stack
          </a>
          <a href="#contact" className="text-[var(--text-muted)] hover:text-[#915EFF] transition">
            Contact
          </a>
        </div>
      </div>

      <p className="text-center text-[var(--text-muted)] text-xs mt-6 opacity-50">
        Inspired by{" "}
        <a
          href="https://www.nareshkhatri.site/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#915EFF] transition underline"
        >
          nareshkhatri.site
        </a>
      </p>
    </footer>
  );
};

export default Footer;
