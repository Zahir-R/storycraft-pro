export const FORMSPREE_ENDPOINT = 'https://formspree.io/'; //REPLACE WITH ACTUAL FORMSPREE ID

export const validateEmail = (email) => {
  if (!email) return false;
  return String(email).includes('@');
};

export const validateName = (name) => {
  if (!name) return false;
  return String(name).trim().length >= 2;
};
