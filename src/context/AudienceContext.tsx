"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Audience = "individual" | "lawyer";

type AudienceContextValue = {
  audience: Audience;
  setAudience: (a: Audience) => void;
  isLawyer: boolean;
  label: string;
};

const AudienceContext = createContext<AudienceContextValue | null>(null);
const KEY = "lulagazette-audience";

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>("individual");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "lawyer" || v === "individual") setAudienceState(v);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const setAudience = useCallback((a: Audience) => {
    setAudienceState(a);
    try {
      localStorage.setItem(KEY, a);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      audience,
      setAudience,
      isLawyer: audience === "lawyer",
      label: audience === "lawyer" ? "For lawyers" : "For individuals",
    }),
    [audience, setAudience]
  );

  // Avoid hydration mismatch flicker for label-dependent chrome
  if (!ready) {
    return (
      <AudienceContext.Provider
        value={{
          audience: "individual",
          setAudience,
          isLawyer: false,
          label: "For individuals",
        }}
      >
        {children}
      </AudienceContext.Provider>
    );
  }

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>;
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error("useAudience must be used within AudienceProvider");
  return ctx;
}
