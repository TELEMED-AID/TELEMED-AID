/******** Authentication **********/
export const USER_AUTHENTICATION_URL = "/auth";
export const USER_LOGIN_URL = `${USER_AUTHENTICATION_URL}/login`;
export const USER_SIGNUP_PATIENT_URL = `${USER_AUTHENTICATION_URL}/signup/patient`;
export const USER_SIGNUP_DOCTOR_URL = `${USER_AUTHENTICATION_URL}/signup/doctor`;
export const GET_CURRENT_USER = `${USER_AUTHENTICATION_URL}/get-current-user`;
export const GET_VERIFICATION_LINK = `${USER_AUTHENTICATION_URL}/verify-id`;
export const USER_LOGOUT = `${USER_AUTHENTICATION_URL}/logout`;

/******** Article **********/
export const ARTICLE_BASE_URL = "/article/article";
export const ARTICLE_SEARCH_URL = `${ARTICLE_BASE_URL}/searchArticle`;
export const ARTICLE_PUBLISH_URL = `${ARTICLE_BASE_URL}/publishArticle`;