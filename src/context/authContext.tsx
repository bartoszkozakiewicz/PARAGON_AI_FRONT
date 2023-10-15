"use client";

import React, { useContext, createContext, useReducer, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { axiosInstance } from "../utils/axiosInstace";

enum Auth {
  LOGIN = "login",
  LOGOUT = "logout",
  VERIFIED = "verify",
}
let initialState = {
  isAuthenticated: false,
  user: null,
};

const userAuthReducer = (state: any, action: { type: string; payload: { isAuthenticated: boolean; user: any } }) => {
  switch (action.type) {
    case Auth.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case Auth.VERIFIED:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case Auth.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      console.log("BŁĄÐ");
  }
};

export const authContext = createContext<any>(null);

export function useAuth() {
  return useContext(authContext);
}

interface AuthProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProps) {
  const path = "http://localhost:5000/api/v1";

  const [state, dispatch] = useReducer(userAuthReducer, initialState);
  console.log("helo");

  const verify = useCallback(async () => {
    await axiosInstance
      .get(path + "/user/showMe")
      .then((res) => {
        console.log(res.data.user, "helo");
        if (res.data.user) {
          dispatch({ type: Auth.VERIFIED, payload: { isAuthenticated: true, user: res.data.user } });
          return res;
        }
        dispatch({ type: Auth.VERIFIED, payload: { isAuthenticated: false, user: null } });
        return res;
      })
      .catch((err) => {
        console.log("BLAD");
        return err;
      });
  }, []);

  useEffect(() => {
    console.log("verify");
    verify();
  }, []);

  // function to login
  const login = useCallback(async (email: string, password: string) => {
    console.log("login");

    await axios
      .post(
        path + "/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("login data", res.data);
        dispatch({ type: Auth.LOGIN, payload: { isAuthenticated: true, user: res.data.user } });
        return res;
      })
      .catch((err) => {
        dispatch({ type: Auth.LOGIN, payload: { isAuthenticated: false, user: null } });
        return err;
      });
  }, []);

  // function to logout
  const logout = useCallback(async (userId: number) => {
    console.log("logout");
    await axiosInstance
      .post(path + "/auth/logout", { userId })
      .then((res) => {
        console.log("SKOCNZYŁEM WYLOGOWYWANIE SIE");
        dispatch({ type: Auth.LOGOUT, payload: { user: null, isAuthenticated: false } });
      })
      .catch((err) => {
        return err;
      });
  }, []);

  const value = useMemo(
    () => ({
      user: state?.user,
      isAuthenticated: state?.isAuthenticated,
      login,
      logout,
    }),
    [state?.user, state?.isAuthenticated, login, logout]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
