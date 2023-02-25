// Public
export const HOME_ROUTE = '/'

// Auth
export const SIGN_IN_ROUTE = '/sign-in'
export const SIGN_UP_ROUTE = '/sign-up'

// Private
export const DASHBOARD_ROUTE = '/dashboard'
export const POSTS_ROUTE = '/posts'
export const POSTS_ADD_ROUTE = `${POSTS_ROUTE}/add`
export const POSTS_EDIT_ROUTE = `${POSTS_ROUTE}/:id`
export const ACCOUNT_ROUTE = '/my-account'
export const ACCOUNT_PERSONAL_INFO_ROUTE = `${ACCOUNT_ROUTE}/personal-info`
export const ACCOUNT_NAME_ROUTE = `${ACCOUNT_PERSONAL_INFO_ROUTE}/name`
export const ACCOUNT_BIRTHDAY_ROUTE = `${ACCOUNT_PERSONAL_INFO_ROUTE}/birthday`
export const ACCOUNT_GENDER_ROUTE = `${ACCOUNT_PERSONAL_INFO_ROUTE}/gender`
export const ACCOUNT_EMAIL_ROUTE = `${ACCOUNT_PERSONAL_INFO_ROUTE}/email`
export const ACCOUNT_SECURITY_ROUTE = `${ACCOUNT_ROUTE}/security`
export const SETTINGS_ROUTE = '/settings'
