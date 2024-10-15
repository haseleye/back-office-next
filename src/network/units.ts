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

export const getUnitTypes = (unitId: string,id:string) =>
  axiosInstance.post(
    "staff/get-unit-types",
    { unitId: unitId ,id:id},
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );
export const selectUnitType = (unitId: string, category: string,id:string) =>
  axiosInstance.post(
    "staff/select-unit-type",
    { unitId: unitId, category: category,id:id },
    {
      headers: {
        "accept-language": "ar",
      },
    }
  );
