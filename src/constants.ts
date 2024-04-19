export const BACKEND_URL = 'https://grading.design.htmlacademy.pro/v1/escape-room';
export const AUTH_TOKEN_KEY_NAME = 'escape-room-token';
export const REQUEST_TIMEOUT = 5000;

export enum AppRoute {
  Root = '/',
  Quest = '/quest',
  MyQuests = '/my-quests',
  Contacts = '/contacts',
  Login = '/login',
}

export enum ApiRoute {
  Quests = '/quest',
  Booking = '/booking',
  Reservation = '/reservation',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum RequestStatus { Idle, Loading, Success, Failed }
