"use client";
import {
  FindCheckType,
  FindPaymentType,
  MobilePhone,
  Payment,
  UserDetails,
} from "@/types";
import { usePathname, useRouter } from "next/navigation";
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
  setChecks: (check: FindCheckType | null) => void;
  setFindPayment: (
    payment: FindPaymentType | undefined,
    user?: UserDetails
  ) => void;
  linkPaymentDetails: {
    amount: string;
    date: string;
    id: string;
    paymentType: string;
    transactionNumber: string;
    isFlush?: boolean;
  };
  setPaymentLink: (data: {
    id: string;
    amount: string;
    date: string;
    paymentType: string;
    transactionNumber: string;
    isFlush?: boolean;
  }) => void;
}>({
  currentUser: undefined,
  selectedType: { cat: 0, subCat: 0 },
  checks: [],
  setCurrentUser: (user) => {},
  setSelectedType(type) {},
  setChecks: (check) => {},
  setFindPayment: (payment, user) => {},
  findPayment: undefined,
  linkPaymentDetails: {
    amount: "",
    date: "",
    id: "",
    paymentType: "",
    transactionNumber: "",
    isFlush: false,
  },
  setPaymentLink: (check) => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const [state, setState] = useState<{
    currentUser: UserDetails | undefined;
    selectedType: {
      cat: number;
      subCat: number;
    };
    linkPaymentDetails: {
      amount: string;
      date: string;
      id: string;
      paymentType: string;
      transactionNumber: string;
      isFlush?: boolean;
    };
    checks: FindCheckType[];
    payments: Payment[];
    mobile: MobilePhone;
    findPayment: FindPaymentType | undefined;
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
    linkPaymentDetails: {
      amount: "",
      date: "",
      id: "",
      paymentType: "",
      transactionNumber: "",
      isFlush: false,
    },
  });
  const setCurrentUser = (
    user: UserDetails | undefined,
    changeSelected?: boolean
  ) => {
    setState({
      ...state,
      currentUser: user,
      selectedType: changeSelected ? { cat: 0, subCat: 0 } : state.selectedType,
    });
  };
  const setSelectedType = (type: { cat: number; subCat: number }) => {
    if (type.cat != state.selectedType.cat) {
      setState({
        ...state,
        selectedType: type,
        checks: [],
        currentUser: undefined,
        findPayment: undefined,
        linkPaymentDetails: {
          amount: "",
          date: "",
          id: "",
          paymentType: "",
          transactionNumber: "",
          isFlush: true,
        },
      });
    } else {
      setState({
        ...state,
        selectedType: type,
        checks: [],
        findPayment: undefined,
        linkPaymentDetails: {
          amount: "",
          date: "",
          id: "",
          paymentType: "",
          transactionNumber: "",
          isFlush: true,
        },
      });
    }
    if (pathName.includes("profile")) router.push("/");
  };
  const setChecks = (check: FindCheckType | null) => {
    setState({ ...state, checks: check ? [check] : [] });
  };

  const setFindPayment = (payment: FindPaymentType | undefined, user?: any) => {
    setState({
      ...state,
      findPayment: payment,
      currentUser: user ?? undefined,
    });
  };
  const setPaymentLink = (data: {
    id: string;
    amount: string;
    date: string;
    paymentType: string;
    transactionNumber: string;
    isFlush?: boolean;
  }) => {
    if (data.isFlush) {
      setState({
        ...state,
        linkPaymentDetails: { ...data },
        currentUser: undefined,
      });
    } else setState({ ...state, linkPaymentDetails: { ...data } });
  };

  return (
    <APPContext.Provider
      value={{
        currentUser: state.currentUser,
        selectedType: state.selectedType,
        checks: state.checks,
        findPayment: state.findPayment,
        linkPaymentDetails: state.linkPaymentDetails,
        setFindPayment,
        setCurrentUser,
        setSelectedType,
        setChecks,
        setPaymentLink,
      }}>
      {children}
    </APPContext.Provider>
  );
}

export function useAppContext() {
  return useContext(APPContext);
}
