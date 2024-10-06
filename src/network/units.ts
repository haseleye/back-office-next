import axiosInstance from "./axiosInstance";

export const getUnits = (lang: string) =>
  axiosInstance.post(
    `users/get-my-units
`,
    {},
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );

export const getUnitTypes = (unitId: string, lang: string) =>
  axiosInstance.post(
    "users/get-unit-types",
    { unitId: unitId },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
export const selectUnitType = (
  unitId: string,
  category: string,
  lang: string
) =>
  axiosInstance.post(
    "users/select-unit-type",
    { unitId: unitId, category: category },
    {
      headers: {
        "accept-language": lang ?? "ar",
      },
    }
  );
