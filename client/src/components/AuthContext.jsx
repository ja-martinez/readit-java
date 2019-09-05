import React, { useState } from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: "",
    username: ""
  });

  const login = async (username, password) => {
    const res = await fetch("http://localhost:8080/api/v1/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const authResponse = await res.json();
    console.log(authResponse)
    if (authResponse.authenticated) {
      setUser({
        id: authResponse.user.id,
        username: authResponse.user.username
      });
    } else {
      return true;
    }
  };

  const register = async (username, password) => {
    const res = await fetch("http://localhost:8080/api/v1/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    }); 
    const json = await res.json();
    setUser({id: json.id, username: json.username})
  }

  const logout = () => {
    setUser({
      id: "",
      username: ""
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;
