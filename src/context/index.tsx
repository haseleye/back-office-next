"use client";
import { UserDetails } from "@/types";
import { getCookie } from "cookies-next";
import { createContext, useContext, useState } from "react";

const APPContext = createContext<{
  currentUser: UserDetails | undefined;
  selectedType: {
    cat: number;
    subCat: number;
  };
  setCurrentUser: (user: UserDetails|undefined) => void;
  setSelectedType: (type: { cat: number; subCat: number }) => void;
}>({
  currentUser: undefined,
  selectedType: { cat: 0, subCat: 0 },
  setCurrentUser: (user) => {},
  setSelectedType(type) {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    currentUser: UserDetails | undefined;
    selectedType: {
      cat: number;
      subCat: number;
    };
  }>({
    currentUser: undefined,
    selectedType: {
      cat: 0,
      subCat: 0,
    },
  });
  const setCurrentUser = (user: UserDetails|undefined) => {
    setState({ ...state, currentUser: user });
  };
  const setSelectedType = (type: { cat: number; subCat: number }) => {
    setState({ ...state, selectedType: type });
  };

  return (
    <APPContext.Provider
      value={{
        currentUser: state.currentUser,
        selectedType: state.selectedType,
        setCurrentUser,
        setSelectedType,
      }}>
      {children}
    </APPContext.Provider>
  );
}

export function useAppContext() {
  return useContext(APPContext);
}
