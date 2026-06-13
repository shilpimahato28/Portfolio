import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { menu, close } from "../assets";
import { useTheme } from "../context/ThemeContext";
import MenuOverlay from "./MenuOverlay";
import config from "../data/config";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg-nav)] backdrop-blur-md border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex justify-between items-center">
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="text-[var(--text-primary)] text-xl font-bold hover:text-[#915EFF] transition"
          >
            {config.name.split(" ")[0]}
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="nav-btn"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="nav-btn px-5 font-semibold"
            >
              Menu
            </button>
          </div>

          <div className="sm:hidden flex items-center gap-3">
            <button onClick={toggleTheme} className="nav-btn" aria-label="Toggle theme">
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-7 h-7 cursor-pointer invert dark:invert-0"
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </div>

        {toggle && (
          <div className="sm:hidden bg-[var(--bg-card)] border-t border-[var(--border)] px-6 py-4">
            <ul className="flex flex-col gap-3">
              {config.navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setToggle(false)}
                    className="text-[var(--text-primary)] text-lg font-medium hover:text-[#915EFF] transition"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
