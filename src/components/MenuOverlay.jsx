import { motion, AnimatePresence } from "framer-motion";
import config from "../data/config";

const MenuOverlay = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-[70] bg-[var(--bg-card)] border-l border-[var(--border)] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-[var(--text-muted)] text-sm uppercase tracking-widest">
                Navigation
              </span>
              <button
                onClick={onClose}
                className="text-[var(--text-primary)] text-2xl font-light hover:opacity-70 transition"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {config.navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] hover:text-[#915EFF] transition-colors py-3 border-b border-[var(--border)]"
                >
                  {link.title}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <p className="text-[var(--text-muted)] text-sm mb-4">
                {config.role}
              </p>
              <a
                href={`mailto:${config.email}`}
                className="text-[#915EFF] font-medium hover:underline"
              >
                {config.email}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
