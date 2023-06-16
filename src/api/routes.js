export const BASE_URL =
  "http://ec2-54-175-171-59.compute-1.amazonaws.com/api/v1";

export default {
  // -----AUTH------//
  signUp: BASE_URL + "/user/signup",
  signIn: BASE_URL + "/user/login",
  sendOTP: BASE_URL + "/user/sendOTP",
  verifyOTP: BASE_URL + "/user/verify",
  forgotPassword: BASE_URL + "/user/forgotPassword",
  resetPassword: BASE_URL + "/user/resetPassword",
  verifyOTPresetPassword: BASE_URL + "/user/verifyOTPResetPassword",
  logOut: BASE_URL + "/user/logout",
  updateUser: BASE_URL + "/user",
  // ----------User--------
  getAllUser: BASE_URL + "/user",
  getStats: BASE_URL + "/user/stats",
  getAllData: BASE_URL + "/user/alluserstats",
};
