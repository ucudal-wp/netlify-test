/**
 * Custom event fired on navigation.
 */
const navEvent = new CustomEvent('nav');

// eslint-disable-next-line import/prefer-default-export
export const navigate = async (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(navEvent);
};
