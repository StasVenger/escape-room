export const BACKEND_URL = 'https://grading.design.htmlacademy.pro/v1/escape-room';
export const AUTH_TOKEN_KEY_NAME = 'escape-room-token';
export const REQUEST_TIMEOUT = 5000;
export const OFFICE_POSITION_LATITUDE = 59.968253;
export const OFFICE_POSITION_LONGITUDE = 30.317505;

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

export const DIFFICULTY_LEVELS = {
  'easy': 'Легкий',
  'medium': 'Средний',
  'hard': 'Сложный'
};

export const QUEST_TYPES = {
  'adventures': 'Приключения',
  'horror': 'Ужасы',
  'mystic': 'Мистика',
  'detective': 'Детектив',
  'sci-fi': 'Sci-fi'
};

export const QUEST_TYPES_FILTERS = [
  { id: 'all', icon: 'icon-all-quests', text: 'Все квесты', width: 26, height: 30 },
  { id: 'adventures', icon: 'icon-adventure', text: 'Приключения', width: 36, height: 30 },
  { id: 'horror', icon: 'icon-horror', text: 'Ужасы', width: 30, height: 30 },
  { id: 'mystic', icon: 'icon-mystic', text: 'Мистика', width: 30, height: 30 },
  { id: 'detective', icon: 'icon-detective', text: 'Детектив', width: 40, height: 30 },
  { id: 'sci-fi', icon: 'icon-sci-fi', text: 'Sci-fi', width: 28, height: 30 },
];

export const QUEST_LEVELS_FILTERS = [
  { id: 'any', text: 'Любой' },
  { id: 'easy', text: 'Лёгкий' },
  { id: 'medium', text: 'Средний' },
  { id: 'hard', text: 'Сложный' },
];
