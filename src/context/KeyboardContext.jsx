import { createContext, useContext, useState } from "react";

const KeyboardContext = createContext(null);

export const KeyboardProvider = ({ children }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [splineReady, setSplineReady] = useState(false);

  return (
    <KeyboardContext.Provider
      value={{
        selectedSkill,
        setSelectedSkill,
        activeSection,
        setActiveSection,
        splineReady,
        setSplineReady,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};

export const useKeyboard = () => {
  const ctx = useContext(KeyboardContext);
  if (!ctx) throw new Error("useKeyboard must be used within KeyboardProvider");
  return ctx;
};
