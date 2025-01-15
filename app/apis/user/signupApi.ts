import {clientInstance} from "../client";

export type SignupData = {
  name: string;
  email: string;
  companyName: string;
  password: string;
};

export async function signupUser(data: SignupData) {
  try {
    const response = await clientInstance.post({
      path: "/route/auths/signup",
      body: data,
    });
    return response;
  } catch (error: any) {
    console.error("요청 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "회원가입 실패");
  }
}
