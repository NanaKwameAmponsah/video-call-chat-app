import { axiosInstance } from "./axios";
export const signup = async (signupData) => {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data;
};
//async function sending a get request to our endpoint then return the result (i.e undefined or authenticated user)
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
    const response = await axiosInstance.post("/auth/onboarding", userData);
    return response.data;
};