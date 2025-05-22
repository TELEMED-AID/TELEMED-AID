/******** Authentication **********/
export const USER_AUTHENTICATION_URL = "/auth";
export const USER_LOGIN_URL = `${USER_AUTHENTICATION_URL}/login`;
export const USER_SIGNUP_PATIENT_URL = `${USER_AUTHENTICATION_URL}/signup/patient`;
export const USER_SIGNUP_DOCTOR_URL = `${USER_AUTHENTICATION_URL}/signup/doctor`;
export const GET_CURRENT_USER = `${USER_AUTHENTICATION_URL}/get-current-user`;
export const GET_VERIFICATION_LINK = `${USER_AUTHENTICATION_URL}/verify-id`;
export const USER_LOGOUT = `${USER_AUTHENTICATION_URL}/logout`;
