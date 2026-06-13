import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../context/ThemeContext";
import { useKeyboard } from "../../context/KeyboardContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useSounds } from "../../hooks/useSounds";
import { SKILLS } from "../../data/constants";
import { getKeyboardState } from "./animated-background-config";

const Spline = lazy(() => import("@splinetool/react-spline"));

gsap.registerPlugin(ScrollTrigger);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const isInputFocused = () => {
  const el = document.activeElement;
  return el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA");
};

const AnimatedBackground = () => {
  const { theme } = useTheme();
  const { setSelectedSkill, setActiveSection, setSplineReady } = useKeyboard();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { playPressSound, playReleaseSound } = useSounds();

  const [splineApp, setSplineApp] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [activeSection, setLocalActiveSection] = useState("hero");
  const [keyboardRevealed, setKeyboardRevealed] = useState(false);

  const selectedSkillRef = useRef(null);
  const splineAppRef = useRef(null);
  const soundsRef = useRef({ playPressSound, playReleaseSound });

  soundsRef.current = { playPressSound, playReleaseSound };

  const applySkill = useCallback(
    (skill) => {
      const app = splineAppRef.current;
      if (!skill || !app) return;
      setSelectedSkill(skill);
      selectedSkillRef.current = skill;
      app.setVariable("heading", skill.label);
      app.setVariable("desc", skill.shortDescription);
    },
    [setSelectedSkill]
  );

  const clearSkill = useCallback(() => {
    const app = splineAppRef.current;
    setSelectedSkill(null);
    selectedSkillRef.current = null;
    if (app) {
      app.setVariable("heading", "");
      app.setVariable("desc", "");
    }
  }, [setSelectedSkill]);

  const revealKeyboard = async (app) => {
    const kbd = app.findObjectByName("keyboard");
    if (!kbd) {
      console.warn("[Spline] keyboard object not found in scene");
      return;
    }

    kbd.visible = false;
    await sleep(400);
    kbd.visible = true;
    setKeyboardRevealed(true);

    const state = getKeyboardState({ section: "hero", isMobile });
    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      { ...state.scale, duration: 1.5, ease: "elastic.out(1, 0.6)" }
    );
    gsap.set(kbd.position, state.position);
    gsap.set(kbd.rotation, state.rotation);

    const keycaps = app.getAllObjects().filter((o) => o.name === "keycap");
    await sleep(600);

    for (let idx = 0; idx < keycaps.length; idx++) {
      const keycap = keycaps[idx];
      keycap.visible = false;
      await sleep(idx * 50);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, ease: "bounce.out" }
      );
    }
  };

  const handleSplineLoad = useCallback(
    (app) => {
      splineAppRef.current = app;
      setSplineApp(app);
      setSplineReady(true);
      setLoadError(null);

      const onMouseHover = (e) => {
        if (!app) return;
        if (e.target.name === "body" || e.target.name === "platform") {
          if (selectedSkillRef.current) soundsRef.current.playReleaseSound();
          clearSkill();
          return;
        }
        const skill = SKILLS[e.target.name];
        if (skill && selectedSkillRef.current?.name !== skill.name) {
          if (selectedSkillRef.current) soundsRef.current.playReleaseSound();
          soundsRef.current.playPressSound();
          applySkill(skill);
        }
      };

      const onKeyDown = (e) => {
        if (isInputFocused()) return;
        const skill = SKILLS[e.target.name];
        if (skill) {
          soundsRef.current.playPressSound();
          applySkill(skill);
        }
      };

      const onKeyUp = () => {
        if (isInputFocused()) return;
        soundsRef.current.playReleaseSound();
        clearSkill();
      };

      app.addEventListener("mouseHover", onMouseHover);
      app.addEventListener("keyDown", onKeyDown);
      app.addEventListener("keyUp", onKeyUp);

      const kbd = app.findObjectByName("keyboard");
      if (kbd) {
        const heroState = getKeyboardState({ section: "hero", isMobile });
        gsap.set(kbd.scale, heroState.scale);
        gsap.set(kbd.position, heroState.position);
        gsap.set(kbd.rotation, heroState.rotation);
      }

      revealKeyboard(app);
      setTimeout(() => ScrollTrigger.refresh(), 500);
    },
    [applySkill, clearSkill, isMobile, setSplineReady]
  );

  useEffect(() => {
    if (!splineApp) return;

    const createTimeline = (triggerId, target, prev) => {
      const kbd = splineApp.findObjectByName("keyboard");
      if (!kbd) return null;

      return gsap.timeline({
        scrollTrigger: {
          trigger: triggerId,
          start: "top 65%",
          end: "bottom bottom",
          onEnter: () => {
            setLocalActiveSection(target);
            setActiveSection(target);
            const state = getKeyboardState({ section: target, isMobile });
            gsap.to(kbd.scale, { ...state.scale, duration: 1 });
            gsap.to(kbd.position, { ...state.position, duration: 1 });
            gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
          },
          onLeaveBack: () => {
            setLocalActiveSection(prev);
            setActiveSection(prev);
            const state = getKeyboardState({ section: prev, isMobile });
            gsap.to(kbd.scale, { ...state.scale, duration: 1 });
            gsap.to(kbd.position, { ...state.position, duration: 1 });
            gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
          },
        },
      });
    };

    const timelines = [
      createTimeline("#skills", "skills", "hero"),
      createTimeline("#projects", "projects", "skills"),
      createTimeline("#experience", "experience", "projects"),
      createTimeline("#contact", "contact", "experience"),
    ].filter(Boolean);

    return () => {
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };
  }, [splineApp, isMobile, setActiveSection]);

  useEffect(() => {
    if (!splineApp) return;

    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");

    if (!textDesktopDark || !textDesktopLight) return;

    const hideAll = () => {
      textDesktopDark.visible = false;
      textDesktopLight.visible = false;
      if (textMobileDark) textMobileDark.visible = false;
      if (textMobileLight) textMobileLight.visible = false;
    };

    if (activeSection !== "skills") {
      hideAll();
      if (activeSection !== "skills") clearSkill();
    } else if (theme === "dark") {
      hideAll();
      isMobile
        ? (textMobileLight.visible = true)
        : (textDesktopLight.visible = true);
    } else {
      hideAll();
      isMobile
        ? (textMobileDark.visible = true)
        : (textDesktopDark.visible = true);
    }
  }, [theme, splineApp, isMobile, activeSection, clearSkill]);

  useEffect(() => {
    if (!splineApp) return;
    const onVisibility = () => {
      if (document.hidden) splineApp.stop();
      else splineApp.play();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [splineApp]);

  return (
    <div className="spline-wrapper" aria-hidden="false">
      {loadError && (
        <div className="spline-error">
          Failed to load 3D keyboard. Check that{" "}
          <code>/scene/skills-keyboard.spline</code> exists.
        </div>
      )}
      <Suspense fallback={<div className="spline-loading">Loading 3D keyboard…</div>}>
        <Spline
          scene="/scene/skills-keyboard.spline"
          onLoad={handleSplineLoad}
          onError={(err) => {
            console.error("[Spline]", err);
            setLoadError(err?.message || "Load failed");
          }}
        />
      </Suspense>
      {!splineApp && !loadError && keyboardRevealed === false && (
        <div className="spline-loading">Loading 3D keyboard…</div>
      )}
    </div>
  );
};

export default AnimatedBackground;
