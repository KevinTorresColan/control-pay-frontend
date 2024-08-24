import { getCookies, api } from "@/services";

const getApi = async <T>(url: string, params?: T) => {
  const token = getCookies("token");
  const response = await api.get(url, {
    headers: {
      Authorization: `bearer ${token}`,
    },
    ...(params && { params }),
  });

  return response;
};

export default getApi;
