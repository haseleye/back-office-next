"use client";
import { bankChecks, MobilePhone, Payment, UserDetails } from "@/types";
import { getCookie } from "cookies-next";
import { createContext, useContext, useState } from "react";

const APPContext = createContext<{
  currentUser: UserDetails | undefined;
  selectedType: {
    cat: number;
    subCat: number;
  };
  checks: bankChecks[];
  setCurrentUser: (user: UserDetails | undefined) => void;
  setSelectedType: (type: { cat: number; subCat: number }) => void;
  setChecks: (check: bankChecks) => void;
}>({
  currentUser: undefined,
  selectedType: { cat: 0, subCat: 0 },
  checks:[],
  setCurrentUser: (user) => {},
  setSelectedType(type) {},
  setChecks:(check)=>{}
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    currentUser: UserDetails | undefined;
    selectedType: {
      cat: number;
      subCat: number;
    };
    checks: bankChecks[];
    payments: Payment[];
    mobile: MobilePhone;
  }>({
    currentUser: undefined,
    selectedType: {
      cat: 0,
      subCat: 0,
    },
    checks: [],
    payments: [],
    mobile: {
      country: "Egypt",
      number:''
    },
  });
  const setCurrentUser = (user: UserDetails|undefined) => {
    setState({ ...state, currentUser: user });
  };
  const setSelectedType = (type: { cat: number; subCat: number }) => {
    setState({ ...state, selectedType: type });
  };
    const setChecks = (check: bankChecks) => {
      setState({ ...state, checks: [check] });
    };


  return (
    <APPContext.Provider
      value={{
        currentUser: state.currentUser,
        selectedType: state.selectedType,
        checks:state.checks,
        setCurrentUser,
        setSelectedType,
        setChecks,
      }}>
      {children}
    </APPContext.Provider>
  );
}

export function useAppContext() {
  return useContext(APPContext);
}
