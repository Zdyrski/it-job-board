import jwtDecode from 'jwt-decode';

export const getHeaders = () => {
  const token = localStorage.getItem('token');
  const result = {
    'Content-Type': 'application/json',
  };
  if (token !== null) {
    (result as any).Authorization = `Bearer ${token}`;
  }
  return result;
};

export const hasAuthority = (authority: string) => {
  const token = localStorage.getItem('token');
  let decodedToken;
  if (token !== null) {
    try {
      decodedToken = jwtDecode(token);
      if (((decodedToken as any).authorities as string[]).includes(authority)) return true;
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }
  }
  return false;
};
