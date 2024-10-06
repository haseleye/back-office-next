import axiosInstance from "./axiosInstance";

export const getNotifications = (lang: string) =>
  axiosInstance.post(
    "users/get-notifications",
    {},
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
