import axiosInstance from "./axiosInstance";

export const checkUser = (number: string) =>
  axiosInstance.post(
    `staff/check-user
`,
    {
      mobile: {
        countryCode: "EG",
        number: number,
      },
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );

export const verifyOtp = (
  data: {
    mobileNumber: string;
    otp: string;
  },
  lang: string
) =>
  axiosInstance.post(
    `staff/verify-otp
`,
    {
      ...data,
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );
export const resendOtpApi = (mobileNumber: string) =>
  axiosInstance.post(
    `staff/resend-otp
`,
    {
      mobileNumber: mobileNumber,
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );
export const resendOtpApiEmail = (email: string) =>
  axiosInstance.post(
    `staff/resend-otp
`,
    {
      email: email,
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );

export const addPayment = (data: {
  id?: string;
  unitId?: string;
  paymentType?: string;
  paymentMethod: string;
  amount: 8000;
  adviceDate: string;
  transactionNumber: string;
  comments: string;
}) =>
  axiosInstance.post(
    `staff/add-payment`,
    {
      ...data,
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );

export const Login = (data: { mobileNumber: string; password: string }) =>
  axiosInstance.post(
    `staff/login`,
    {
      ...data,
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );

export const findCheck = (bankName: string, number: string) =>
  axiosInstance.post(
    `staff/find-bank-check`,
    {
      bankName: bankName,
      number: number,
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );

  export const findTransaction = (refNumber: string, paymentMethod:string) =>
    axiosInstance.post(
      `staff/find-transaction`,
      {
        transactionNumber: refNumber,
        paymentMethod: paymentMethod,
      },
      {
        headers: {
          "accept-language": "ar",
        },
      }
    );
export const findPaymentApi = (refNumber: string) =>
  axiosInstance.post(
    `staff/find-payment`,
    {
      referenceNumber: refNumber,
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );
export const addCheck = (form: FormData) =>
  axiosInstance.post(`staff/add-bank-check`, form, {
    headers: {
      "accept-language": "ar",
      "Content-Type": "multipart/form-data",
    },
  });
export const addContract = (form: FormData) =>
  axiosInstance.post(`staff/add-contract`, form, {
    headers: {
      "accept-language": "ar",
      "Content-Type": "multipart/form-data", // Set the content type
    },
  });
export const linkPayment = (
  id: string,
  unitId: string,
  paymentType: string,
  paymentMethod: string,
  transactionNumber: string
) =>
  axiosInstance.post(
    `staff/link-payment`,
    {
      id: id,
      unitId: unitId,
      paymentType: paymentType,
      paymentMethod: paymentMethod,
      transactionNumber: transactionNumber,
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );

export const forgotPassword = (number: string) =>
  axiosInstance.post(
    `staff/forgot-password
`,
    {
      mobile: {
        countryCode: "EG",
        number: number,
      },
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );
export const resetPassword = (data: any) =>
  axiosInstance.post(
    `staff/change-password
`,
    { ...data },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );

export const updatePhoto = (data: any) =>
  axiosInstance.post(
    `staff/update-photo
`,
    data,
    {
      headers: {
        "accept-language": "ar",
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const deletePhoto = (lang: string) =>
  axiosInstance.post(
    `staff/delete-photo`,
    {},
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );

export const getUserInfo = () =>
  axiosInstance.post(
    `staff/get-profile-info`,
    {},
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );

export const updateNationalId = (data: any) =>
  axiosInstance.post(
    `staff/update-national-id
`,
    data,
    {
      headers: {
        "accept-language": "ar",
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const updateMobile = (number: string) =>
  axiosInstance.post(
    `staff/update-mobile
`,
    {
      mobile: {
        countryCode: "EG",
        number: number,
      },
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );
export const updateEmail = (email: string) =>
  axiosInstance.post(
    `staff/update-email
`,
    {
      email: email,
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );
export const updateCheckStatus = ({
  bankName,
  number,
  newStatus,
  adviceDate,
}: {
  bankName: string;
  number: string;
  newStatus: string;
  adviceDate: string;
}) =>
  axiosInstance.post(
    `staff/update-check-status
`,
    {
      bankName: bankName,
      number: number,
      newStatus: newStatus,
      adviceDate: adviceDate,
    },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );

  export const verifyOtpEmail = (
    data: {
      email: string;
      otp: string;
    },
    lang: string
  ) => {
    return axiosInstance.post(
      `staff/verify-otp
`,
      {
        ...data,
        email: data.email,
      },
      {
        headers: {
          "accept-language": lang ?? "ar",
        },
      }
    );
  };