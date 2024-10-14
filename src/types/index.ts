export enum AUTH_STEP_ENUM {
  MOBILE_NUMBER,
  OTP,
  VERIFY_PASSWORD,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  CREATE_USER,
  FORGET_PASSWORD_OTP,
}
export interface pageParams {
  lang: any;
}

export interface checkUserModal {
  otpSent: boolean;
  isExisted: boolean;
  otpResend: string;
  mobileNumber: string;
  verificationCode: string;
}

export interface Category {
  categoryName: string;
  installments: Installments;
  images: string[];
  category: string;
  bookingAmount: string | number;
  contractingAmount: string | number;
  grossAmount: number;
  cashAmount: number;
}
export interface Installments {
  count: number;
  amount: number;
  spanInMonths: number;
}

export interface Payment {
  id: string;
  paymentMethod: string;
  amount: number;
  adviceDate: string;
  unitId: string;
  paymentMethodText: string;
}
export interface bankChecks {
  number: string;
  dueDate: string;
  amount: number;
  bankName: string;
  status: {
    current: string;
  };
  statusText: string;
  unitId: string;
}
export interface FindCheckType {
  number: string;
  dueDate: string;
  amount: number;
  bankName: string;
  status: {
    current: string;
  };
  statusText: string;
  unitId: string;
  userName: string;
  mobile: { country: string; number: string };
}
export interface FindPaymentType {
  mobile: { country: string; number: string };
  unitId: string;
  paymentType: string;
  paymentMethod: string;
  amount: number;
  status: string;
  date: string;
  transactionNumber: string;
  comments: string;
}
export interface Unit {
  id: string;
  bookingDate: string;
  contractingDate: string;
  category: string;
  unitNumber: string;
  totalCashAmount: number;
  totalAmount: number;
  totalChecksAmount: number;
  contractDate: string | null;
  completionDate?: string | null;
  info: string;
  discount?: string;
}

export interface myUnit {
  bookingAmount: number;
  cashAmount: number;
  category: string;
  categoryName: string;
  contractingAmount: number;
  grossAmount: number;
  installments: { count: number; amount: number; spanInMonths: number };
  _id: string;
}
export interface PaymentOption {
  id: string;
  bookingDate: string;
  contractingDate: string;
  category: string;
  unitNumber: string;
  totalCashAmount: number;
  totalAmount: number;
  totalChecksAmount: number;
  contractDate: string | null;
}

export interface User {
  firstName: string;
  lastName: string;
  mobile: {
    alternate: Object;
    isVerified: boolean;
    primary: {
      country: string;
      number: string;
    };
  };
  profilePhoto: string;
  email: string;
}

export interface Notification {
  text: string;
  date: string;
  isRead: boolean;
  timeAgo: string;
}
export interface PaymentOptions {
  unitId: string;
  value: 0;
  text: string;
  paymentType: string;
  memo: string;
  action: string;
  actionText: string;
}

export interface UserInfo {
  mobile: Mobile;
  email: Email;
  notifications: userNotifications;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  identification: {
    nationalId: {
      back: string;
      front: string;
    };
  };
}
export interface GuestInfo {
  email: string;
  firstName: string;
  id: string;
  identification: {
    nationalId: {
      back: string;
      front: string;
    };
  };
  userName: string | undefined;
  lastName: string;
  mobile: string;
  status: {
    isSuspended: boolean;
    login: { failedTrials: number; nextTrial: string };
    message: string;
  };
}
export interface UserDetails {
  bankChecks: bankChecks[];
  info: GuestInfo;
  payments: Payment[];
  totalChecks: number;
  totalPayments: number;
  units: Unit[];
}

interface Mobile {
  primary: {
    country: string;
    number: string;
  };
  isVerified: boolean;
}
export interface MobilePhone {
  country: string;
  number: string;
}

interface Email {
  isVerified: boolean;
  primary: string;
  alternate: string;
}
interface userNotifications {
  newCount: number;
}
