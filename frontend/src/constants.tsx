// LOGIN/REGISTER CONSTANTS
export const REGEX_EMAIL = '';
export const REGEX_PASSWORD = 's';

// OFFER CONSTANTS
export const REGEX_OFFER_TITLE = 's';
export const REGEX_OFFER_DESCRIPTION = 's';
export const REGEX_OFFER_LOCATION = 's';
export const OFFER_MIN_TAGS_NUMBER = 3;
export const OFFER_MAX_TAGS_NUMBER = 8;

// HELPER FUNCTIONS
export const getHeaders = () => {
  const token = sessionStorage.getItem('jwt-token');
  const result = {
    'Content-Type': 'application/json',
  };
  if (sessionStorage.getItem('jwt-token') !== null) {
    (result as any).Authorization = `Bearer ${token}`;
  }
  return result;
};
