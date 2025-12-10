import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth";
import type { JSX } from "react";

export const AuthGuard: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const token = useAuth((s) => s.user);
  const location = useLocation();

  if (!token)
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  return children;
};
