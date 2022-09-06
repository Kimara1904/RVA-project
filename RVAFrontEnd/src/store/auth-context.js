import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: null,
  onLogout: () => {},
  onLogin: (username, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    console.log(currentUser);

    if (loggedIn === "1") {
      setIsLoggedIn(true);
      setUser(currentUser);
    }
  }, []);

  const logoutHandler = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const loginHandler = async (username, password) => {
    try {
      const response = await fetch(
        "http://localhost:58817/api/Worker?username=" +
          username +
          "&password=" +
          password
      );

      console.log(response);
      if (!response.ok) {
        console.log("Something went wrong with Login!!!!");
        throw new Error("Something went wrong with Login!!!!");
      }

      const data = await response.json();

      //console.log(data);

      if (data == null)
      {
        console.log("There is no user with this username and password!!!");
        throw new Error("There is no user with this username and password!!!");
      }

      const authUser = {
          username: data.Username,
          password: data.Password,
          firstName: data.FirstName,
          lastName: data.LastName,
          role: data.Role,
          facultyName: data.FacultyName,
          index: data.Index
        };

      console.log("RADIM");
      setUser(authUser);
      setIsLoggedIn(true);
      sessionStorage.setItem("isLoggedIn", "1");
      sessionStorage.setItem("user", JSON.stringify(authUser));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
