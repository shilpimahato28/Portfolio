import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import SectionHeader from "./SectionHeader";
import { PROJECTS } from "../data/constants";

const Projects = () => {
  return (
    <section
      id="projects"
      className="section-padding relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Projects" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="project-card group"
            >
              <div
                className={`project-card-image bg-gradient-to-br ${project.gradient}`}
              >
                <span className="text-6xl font-black text-white/20 select-none">
                  {project.title.charAt(0)}
                </span>

                {/* Overlay with centered GitHub icon */}
                <div className="project-card-overlay flex items-center justify-center">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-btn w-14 h-14 flex items-center justify-center rounded-full"
                      aria-label={`GitHub ${project.title}`}
                    >
                      <FaGithub size={24} />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-5">
                <p className="text-[#915EFF] text-xs font-semibold uppercase tracking-wider mb-1">
                  {project.category}
                  {project.date && (
                    <span className="text-[var(--text-muted)] font-normal normal-case ml-2">
                      · {project.date}
                    </span>
                  )}
                </p>

                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[#915EFF] transition-colors">
                  {project.title}
                </h3>

                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-xs bg-[var(--bg-elevated)] text-[var(--text-muted)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;