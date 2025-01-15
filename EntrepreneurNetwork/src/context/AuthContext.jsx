import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  // Store token and user in AsyncStorage and update state
  const storeTokenAndUser = async (serverToken, userid, username) => {
    setToken(serverToken);
    setUser(userid);
    setUsername(username);
    await AsyncStorage.setItem("token", serverToken);
    await AsyncStorage.setItem("user", JSON.stringify(userid));
    await AsyncStorage.setItem("username", JSON.stringify(username));
  };

  // Remove token and user from AsyncStorage and clear state
  const LogoutUser = async () => {
    setToken(null);
    setUser(null);
    setUsername(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("username");
  };

  // Fetch token and user from AsyncStorage on app load
  useEffect(() => {
    const fetchAuthData = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedUsername) {
        setUsername(JSON.parse(storedUsername));
      }
    };
    fetchAuthData();
  }, []);

  // Function to refresh the token

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        storeTokenAndUser,
        LogoutUser,
        user,
        token,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
