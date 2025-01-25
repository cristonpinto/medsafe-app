// src/hooks/useAuth.js
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const user = useSelector((state) => state.user);
  return { user };
};