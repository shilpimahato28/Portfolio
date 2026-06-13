import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaUsers, FaComments } from "react-icons/fa";
import { menu, close } from "../assets";
import { useTheme } from "../context/ThemeContext";
import MenuOverlay from "./MenuOverlay";
import config from "../data/config";
import { socket } from "../socket"; // IMPORTANT

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [onlineUsers, setOnlineUsers] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

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

  // 👥 ONLINE USERS LISTENER
  useEffect(() => {
    socket.on("online-users", (count) => {
      setOnlineUsers(count);
    });

    return () => socket.off("online-users");
  }, []);

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

          {/* LEFT NAME */}
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="text-[var(--text-primary)] text-xl font-bold hover:text-[#915EFF] transition"
          >
            {config.name.split(" ")[0]}
          </Link>

          {/* RIGHT SECTION */}
          <div className="hidden sm:flex items-center gap-4">

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="nav-btn"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            {/* 👥 ONLINE USERS */}
            <div className="flex items-center gap-1 text-[var(--text-primary)] text-sm">
              <FaUsers />
              <span>{onlineUsers}</span>
            </div>

            {/* 💬 CHAT BUTTON */}
            <button
              onClick={() => setChatOpen(true)}
              className="nav-btn"
              aria-label="Chat"
            >
              <FaComments />
            </button>

            {/* MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(true)}
              className="nav-btn px-5 font-semibold"
            >
              Menu
            </button>
          </div>

          {/* MOBILE */}
          <div className="sm:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="nav-btn"
              aria-label="Toggle theme"
            >
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

        {/* MOBILE MENU */}
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

      {/* SIMPLE CHAT POPUP (placeholder) */}
      {chatOpen && (
        <div className="fixed bottom-5 right-5 w-80 h-96 bg-black text-white p-3 rounded-xl z-50">
          <div className="flex justify-between items-center mb-2">
            <h3>Live Chat</h3>
            <button onClick={() => setChatOpen(false)}>✕</button>
          </div>

          <div className="text-sm text-gray-300">
            Chat system coming soon...
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;