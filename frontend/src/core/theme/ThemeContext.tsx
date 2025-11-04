import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type FontSize = "sm" | "md" | "lg";

interface ThemeContextType {
  theme: Theme;
  fontSize: FontSize;
  reduceMotion: boolean;
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
  setReduceMotion: (reduce: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem("guideaut-theme");
    return (stored as Theme) || "light";
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const stored = localStorage.getItem("guideaut-font-size");
    return (stored as FontSize) || "md";
  });

  const [reduceMotion, setReduceMotionState] = useState<boolean>(() => {
    const stored = localStorage.getItem("guideaut-reduce-motion");
    return stored === "true";
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("guideaut-theme", newTheme);
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem("guideaut-font-size", size);
  };

  const setReduceMotion = (reduce: boolean) => {
    setReduceMotionState(reduce);
    localStorage.setItem("guideaut-reduce-motion", String(reduce));
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar tema
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Aplicar tamanho de fonte
    root.classList.remove("font-size-sm", "font-size-md", "font-size-lg");
    root.classList.add(`font-size-${fontSize}`);

    // Aplicar redução de movimento
    if (reduceMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
  }, [theme, fontSize, reduceMotion]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        fontSize,
        reduceMotion,
        setTheme,
        setFontSize,
        setReduceMotion,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
