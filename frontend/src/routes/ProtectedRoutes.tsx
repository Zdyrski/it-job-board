/* eslint-disable no-unused-vars */
import { Outlet, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

interface ProtectedRoutesInterface{
    logged?: boolean
    authority: string
}

function ProtectedRoutes({ logged, authority } : ProtectedRoutesInterface) {
  const getDecodedToken = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      try {
        return jwtDecode(token);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    return null;
  };

  const isTokenValid = () => {
    const decodedToken = getDecodedToken();
    if (decodedToken !== null) {
      if ((decodedToken as any).iss === 'ItJobBoard' && new Date((decodedToken as any).exp * 1000).getTime() > Date.now()) {
        return true;
      }
    }
    localStorage.removeItem('token');
    return false;
  };

  const isUserAuthorized = () => {
    const decodedToken = getDecodedToken();
    if (decodedToken !== null) {
      if (((decodedToken as any).authorities as string[]).includes(authority)) {
        return true;
      }
    }
    return false;
  };

  const verify = () => {
    if (logged) {
      return isTokenValid() && isUserAuthorized();
    }
    if (isTokenValid()) {
      return false;
    }
    return true;
  };

  return (
    verify() ? <Outlet /> : <Navigate to={logged ? 'sign-in' : '/'} />
  );
}

ProtectedRoutes.defaultProps = {
  logged: true,
};

export default ProtectedRoutes;
