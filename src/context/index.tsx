"use client";
import { bankChecks, FindCheckType, FindPaymentType, MobilePhone, Payment, UserDetails } from "@/types";
import { getCookie } from "cookies-next";
import { createContext, useContext, useState } from "react";

const APPContext = createContext<{
  currentUser: UserDetails | undefined;
  selectedType: {
    cat: number;
    subCat: number;
  };
  checks: FindCheckType[];
  findPayment: FindPaymentType | undefined;
  setCurrentUser: (
    user: UserDetails | undefined,
    changeSelected?: boolean
  ) => void;
  setSelectedType: (type: { cat: number; subCat: number }) => void;
  setChecks: (check: FindCheckType) => void;
  setFindPayment: (payment: FindPaymentType,user:UserDetails) => void;
}>({
  currentUser: undefined,
  selectedType: { cat: 0, subCat: 0 },
  checks: [],
  setCurrentUser: (user) => {},
  setSelectedType(type) {},
  setChecks: (check) => {},
  setFindPayment: (payment,user) => {},
  findPayment: undefined,
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    currentUser: UserDetails | undefined;
    selectedType: {
      cat: number;
      subCat: number;
    };
    checks: FindCheckType[];
    payments: Payment[];
    mobile: MobilePhone;
    findPayment: FindPaymentType|undefined
  }>({
    currentUser: undefined,
    selectedType: {
      cat: 0,
      subCat: 0,
    },
    checks: [],
    findPayment: undefined,
    payments: [],
    mobile: {
      country: "Egypt",
      number: "",
    },
  });
  const setCurrentUser = (user: UserDetails|undefined,changeSelected?:boolean) => {
    setState({ ...state, currentUser: user,selectedType:changeSelected?{cat:0,subCat:0}:state.selectedType });

  };
  const setSelectedType = (type: { cat: number; subCat: number }) => {
    setState({ ...state, selectedType: type ,checks:[]});
  };
    const setChecks = (check: FindCheckType) => {
      setState({ ...state, checks: [check] });
    };

      const setFindPayment = (payment: FindPaymentType,user:any) => {
        setState({ ...state, findPayment: payment ,currentUser:user});
      };

  return (
    <APPContext.Provider
      value={{
        currentUser: state.currentUser,
        selectedType: state.selectedType,
        checks: state.checks,
        findPayment: state.findPayment,
        setFindPayment,
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
