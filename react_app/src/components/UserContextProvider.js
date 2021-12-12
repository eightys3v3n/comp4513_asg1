import React, {createContext, useState, useEffect} from 'react';


export const UserContext = createContext([]);

function UserProvider({children}) {
  const LOCAL_STORAGE_KEY = 'user';
  let [userObj, setUserObject] = useState(null);

  useEffect(() => {
    let localUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localUser != null) {
      try {
        console.log("Retireving local user.");
        localUser = JSON.parse(localUser)
      // if ( isEmpty(localUser) || localUser.length > 0) {
        setUserObject(localUser);
      // }
      } catch (e) {
        console.warn("Failed to parse locally stored user. Value is:");
        console.log(localUser);
        console.log(e);
      }
    }
  }, []);


  function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }


  function logOutUserLocally(user) {
    //http://server.eighty7.ca:8082/api/logout
    fetch('http://localhost:8082/api/logout',
          { credentials: 'include' });
    setUserObject(null);
    console.log("Logout User");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }


  function logUserLocally(user) {
    setUserObject(user);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  }


  function isLoggedIn() {
    if (userObj != null) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <UserContext.Provider value={{userObj, logOutUserLocally, logUserLocally, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}


export default UserProvider;
