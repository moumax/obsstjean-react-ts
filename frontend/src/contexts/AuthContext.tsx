import React, { createContext, useContext } from "react";
import useSWR from "swr";
import callAPI from "@/api/callAPI";

interface UserData {
  isAuthenticated: boolean;
  role: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const { data: dataSession } = useSWR<UserData>(
    `${import.meta.env.VITE_BACKEND_URL}/api/session/`,
    callAPI,
  );
  const isLoggedIn =
    dataSession?.isAuthenticated !== undefined
      ? dataSession.isAuthenticated
      : false;
  const userRole = dataSession?.role || "";

  if (!children) {
    throw new Error("AuthProvider must have children components");
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
