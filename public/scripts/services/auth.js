import { post } from '../utils/api.js';
import { removeSessionToken, setSessionToken } from '../utils/session.js';

/**
 * Custom event fired when authentication status changes.
 */
const authEvent = new CustomEvent('auth');

export const logIn = async (username, password) => {
  const { data: session, error } = await post('/sessions', {
    username,
    password,
  });
  if (error) {
    if (error.status === 401) {
      throw new Error('Invalid username/password combination.');
    }

    throw new Error('Oops! Something went wrong...');
  }

  setSessionToken(session.token);

  window.dispatchEvent(authEvent);
};

export const logOut = () => {
  removeSessionToken();

  window.dispatchEvent(authEvent);
};
