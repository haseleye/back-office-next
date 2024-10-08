import axiosInstance from "./axiosInstance";

export const checkUser = (number: string, lang: string) =>
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
        "accept-language": lang ?? "ar",
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
        "accept-language": lang ?? "ar",
      },
    }
  );
export const resendOtpApi = (mobileNumber: string, lang: string) =>
  axiosInstance.post(
    `staff/resend-otp
`,
    {
      mobileNumber: mobileNumber,
    },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
export const resendOtpApiEmail = (email: string, lang: string) =>
  axiosInstance.post(
    `staff/resend-otp
`,
    {
      email: email,
    },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const createUser = (
  data: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    password: string;
    verificationCode: string;
  },
  lang: string
) =>
  axiosInstance.post(
    `staff/create-user`,
    {
      ...data,
      role: "User",
    },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const Login = (
  data: {
    mobileNumber: string;
    password: string;
  }
) =>
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
export const forgotPassword = (number: string, lang: string) =>
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
        "accept-language": lang ?? "ar",
      },
    }
  );
export const resetPassword = (data: any, lang: string) =>
  axiosInstance.post(
    `staff/change-password
`,
    { ...data },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const updatePhoto = (data: any, lang: string) =>
  axiosInstance.post(
    `staff/update-photo
`,
    data,
    {
      headers: {
        "accept-language": lang ?? "ar",
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
        "accept-language": lang ?? "ar",
      },
    }
  );

export const getUserInfo = (lang: string) =>
  axiosInstance.post(
    `staff/get-profile-info`,
    {},
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const updateNationalId = (data: any, lang: string) =>
  axiosInstance.post(
    `staff/update-national-id
`,
    data,
    {
      headers: {
        "accept-language": lang ?? "ar",
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const updateMobile = (number: string, lang: string) =>
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
        "accept-language": lang ?? "ar",
      },
    }
  );
export const updateEmail = (email: string, lang: string) =>
  axiosInstance.post(
    `staff/update-email
`,
    {
      email: email,
    },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
