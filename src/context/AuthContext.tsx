"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCountryByCode, getCountryFlag } from "@/data/africanCountries";
import { ScrapedDocument, harvestedCorpus } from "@/lib/scraper";

export type UserRole =
  | "citizen"
  | "attorney"
  | "advocate"
  | "researcher"
  | "student"
  | "counsel";

export type User = {
  id: string;
  name: string;
  email: string;
  country: string;
  countryCode: string;
  flag: string;
  role: UserRole;
  roleTitle: string;
  organization?: string;
  avatarText: string;
  joinedAt: string;
};

export type DemoProfile = {
  id: string;
  name: string;
  email: string;
  countryCode: string;
  countryName: string;
  flag: string;
  role: UserRole;
  roleTitle: string;
  organization: string;
};

export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: "demo-za-advocate",
    name: "Lulamile Mkhungela",
    email: "mkhungela.l@gmail.com",
    countryCode: "ZA",
    countryName: "South Africa",
    flag: "🇿🇦",
    role: "advocate",
    roleTitle: "Advocate of the High Court",
    organization: "Johannesburg Bar",
  },
  {
    id: "demo-ke-researcher",
    name: "Dr. Amina Ochieng",
    email: "amina.ochieng@uonbi.ac.ke",
    countryCode: "KE",
    countryName: "Kenya",
    flag: "🇰🇪",
    role: "researcher",
    roleTitle: "Constitutional Law Scholar",
    organization: "University of Nairobi / Kenya Law",
  },
  {
    id: "demo-ng-counsel",
    name: "Barrister Chinedu Adeleke",
    email: "chinedu.adeleke@adelekepartners.ng",
    countryCode: "NG",
    countryName: "Nigeria",
    flag: "🇳🇬",
    role: "counsel",
    roleTitle: "Corporate Counsel",
    organization: "Nigerian Bar Association (Lagos Branch)",
  },
  {
    id: "demo-gh-citizen",
    name: "Kwame Mensah",
    email: "kwame.mensah@accra-enterprise.gh",
    countryCode: "GH",
    countryName: "Ghana",
    flag: "🇬🇭",
    role: "citizen",
    roleTitle: "SME Founder & Citizen",
    organization: "Ghana SME Federation",
  },
];

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  selectedCountry: string; // "all" or 2-letter country code
  setSelectedCountry: (code: string) => void;
  login: (email: string, password?: string, countryCode?: string, role?: UserRole) => Promise<boolean>;
  signup: (data: {
    name: string;
    email: string;
    password?: string;
    countryCode: string;
    role: UserRole;
    organization?: string;
  }) => Promise<boolean>;
  loginAsDemo: (demoId: string) => void;
  logout: () => void;
  savedDocIds: string[];
  toggleSaveDoc: (docId: string) => void;
  isDocSaved: (docId: string) => boolean;
  scrapedDocs: ScrapedDocument[];
  addScrapedDocs: (docs: ScrapedDocument[]) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_USER_KEY = "lulagazette-auth-user";
const STORAGE_SAVED_KEY = "lulagazette-saved-docs";
const STORAGE_COUNTRY_KEY = "lulagazette-selected-country";
const STORAGE_SCRAPED_KEY = "lulagazette-scraped-docs";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCountry, setSelectedCountryState] = useState<string>("all");
  const [savedDocIds, setSavedDocIds] = useState<string[]>([]);
  const [scrapedDocs, setScrapedDocs] = useState<ScrapedDocument[]>([]);
  const [ready, setReady] = useState(false);

  // Initialise from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedCountry = localStorage.getItem(STORAGE_COUNTRY_KEY);
      if (storedCountry) {
        setSelectedCountryState(storedCountry);
      }
      const storedSaved = localStorage.getItem(STORAGE_SAVED_KEY);
      if (storedSaved) {
        setSavedDocIds(JSON.parse(storedSaved));
      }
      const storedScraped = localStorage.getItem(STORAGE_SCRAPED_KEY);
      if (storedScraped) {
        setScrapedDocs(JSON.parse(storedScraped));
      } else {
        // Seed with sample harvested gazettes
        setScrapedDocs(harvestedCorpus.slice(0, 6));
      }
    } catch {
      /* ignore storage error */
    }
    setReady(true);
  }, []);

  const setSelectedCountry = useCallback((code: string) => {
    const cleanCode = code ? code.toUpperCase() : "ALL";
    const finalCode = cleanCode === "ALL" ? "all" : cleanCode;
    setSelectedCountryState(finalCode);
    try {
      localStorage.setItem(STORAGE_COUNTRY_KEY, finalCode);
    } catch {
      /* ignore */
    }
  }, []);

  const login = useCallback(
    async (email: string, _password = "", countryCode = "ZA", role: UserRole = "advocate") => {
      const c = getCountryByCode(countryCode) || getCountryByCode("ZA");
      const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      const roleTitles: Record<UserRole, string> = {
        citizen: "Individual Citizen",
        attorney: "Admitted Attorney",
        advocate: "Advocate / Counsel",
        researcher: "Legal Researcher & Scholar",
        student: "Law Student",
        counsel: "Corporate Legal Counsel",
      };

      const newUser: User = {
        id: "usr-" + Date.now(),
        name: name || "Legal Practitioner",
        email,
        country: c?.name || "South Africa",
        countryCode: c?.code || "ZA",
        flag: c?.flag || "🇿🇦",
        role,
        roleTitle: roleTitles[role] || "Legal Practitioner",
        avatarText: (name || "LP").slice(0, 2).toUpperCase(),
        joinedAt: new Date().toISOString(),
      };

      setUser(newUser);
      setSelectedCountry(newUser.countryCode);
      try {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser));
      } catch {
        /* ignore */
      }
      return true;
    },
    [setSelectedCountry]
  );

  const signup = useCallback(
    async (data: {
      name: string;
      email: string;
      password?: string;
      countryCode: string;
      role: UserRole;
      organization?: string;
    }) => {
      const c = getCountryByCode(data.countryCode) || getCountryByCode("ZA");
      const roleTitles: Record<UserRole, string> = {
        citizen: "Individual Citizen",
        attorney: "Admitted Attorney",
        advocate: "Advocate / Counsel",
        researcher: "Legal Researcher & Scholar",
        student: "Law Student",
        counsel: "Corporate Legal Counsel",
      };

      const newUser: User = {
        id: "usr-" + Date.now(),
        name: data.name,
        email: data.email,
        country: c?.name || "South Africa",
        countryCode: c?.code || "ZA",
        flag: c?.flag || "🇿🇦",
        role: data.role,
        roleTitle: roleTitles[data.role] || "Legal Practitioner",
        organization: data.organization,
        avatarText: data.name.slice(0, 2).toUpperCase(),
        joinedAt: new Date().toISOString(),
      };

      setUser(newUser);
      setSelectedCountry(newUser.countryCode);
      try {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser));
      } catch {
        /* ignore */
      }
      return true;
    },
    [setSelectedCountry]
  );

  const loginAsDemo = useCallback(
    (demoId: string) => {
      const demo = DEMO_PROFILES.find((d) => d.id === demoId) || DEMO_PROFILES[0];
      const newUser: User = {
        id: demo.id,
        name: demo.name,
        email: demo.email,
        country: demo.countryName,
        countryCode: demo.countryCode,
        flag: demo.flag,
        role: demo.role,
        roleTitle: demo.roleTitle,
        organization: demo.organization,
        avatarText: demo.name.slice(0, 2).toUpperCase(),
        joinedAt: "2026-01-01T00:00:00Z",
      };
      setUser(newUser);
      setSelectedCountry(newUser.countryCode);
      try {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser));
      } catch {
        /* ignore */
      }
    },
    [setSelectedCountry]
  );

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_USER_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleSaveDoc = useCallback((docId: string) => {
    setSavedDocIds((prev) => {
      const next = prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId];
      try {
        localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const isDocSaved = useCallback(
    (docId: string) => {
      return savedDocIds.includes(docId);
    },
    [savedDocIds]
  );

  const addScrapedDocs = useCallback((newDocs: ScrapedDocument[]) => {
    setScrapedDocs((prev) => {
      const existingIds = new Set(prev.map((d) => d.id));
      const fresh = newDocs.filter((d) => !existingIds.has(d.id));
      const next = [...fresh, ...prev];
      try {
        localStorage.setItem(STORAGE_SCRAPED_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      selectedCountry,
      setSelectedCountry,
      login,
      signup,
      loginAsDemo,
      logout,
      savedDocIds,
      toggleSaveDoc,
      isDocSaved,
      scrapedDocs,
      addScrapedDocs,
    }),
    [
      user,
      selectedCountry,
      setSelectedCountry,
      login,
      signup,
      loginAsDemo,
      logout,
      savedDocIds,
      toggleSaveDoc,
      isDocSaved,
      scrapedDocs,
      addScrapedDocs,
    ]
  );

  if (!ready) {
    return (
      <AuthContext.Provider
        value={{
          user: null,
          isAuthenticated: false,
          selectedCountry: "all",
          setSelectedCountry: () => {},
          login: async () => true,
          signup: async () => true,
          loginAsDemo: () => {},
          logout: () => {},
          savedDocIds: [],
          toggleSaveDoc: () => {},
          isDocSaved: () => false,
          scrapedDocs: [],
          addScrapedDocs: () => {},
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
