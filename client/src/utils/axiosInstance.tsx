import axios from "axios";
import envConfig from "../config/env.config";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: envConfig.backendUrl,
});

axiosInstance.interceptors.request.use(async function (config) {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      //   config.sent = true;
      //   const res = await getNewAccessToken();
      //   const accessToken = res?.data?.accessToken;
      //   if (!accessToken) {
      //     Promise.reject(error);
      //   }
      //   config.headers["Authorization"] = accessToken;
      //   (await cookies()).set("accessToken", accessToken);
      //   return axiosInstance(config);
    } else {
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
