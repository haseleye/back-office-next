import axiosInstance from "./axiosInstance";

export const getPayments = (lang: string) =>
  axiosInstance.post(
    `users/get-my-payments
`,
    {},
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const getPaymentsOptions = (lang: string) =>
  axiosInstance.post(
    `users/get-payment-options
`,
    {},
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
export const createPayment = (data: any, lang: string) =>
  axiosInstance.post(
    `payments/create-payment
`,
    { ...data },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
