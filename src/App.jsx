import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { KeyboardProvider } from "./context/KeyboardContext";
import AnimatedBackground from "./components/canvas/AnimatedBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <>
    <CustomCursor />
    <BrowserRouter>
      <ThemeProvider>
        <KeyboardProvider>
          <div className="relative z-0">
            <AnimatedBackground />
            <Navbar />
            <main className="relative z-10 canvas-overlay-mode">
              <Hero />
              <TechStack />
              <Projects />
              <Experience />
              <Education />
              <Achievements />
              <Contact />
            </main>
            <Footer />
          </div>
        </KeyboardProvider>
      </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
