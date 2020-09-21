import { getSessionToken } from './session.js';

// eslint-disable-next-line import/prefer-default-export
export const isAuthenticated = () => !!getSessionToken();
