import React, {createContext, useState, useEffect} from 'react';


export const UserContext = createContext([]);

function UserProvider(props,{children}) {
  const LOCAL_STORAGE_KEY = 'user';
  let userObj = props.uO;


  useEffect(() => {
    console.log("STEP 1");
  let localUser = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (localUser != null) {
    console.log("STEP 2");
    try {
      console.log("Retireving local user.");
      localUser = JSON.parse(localUser)

      // if ( isEmpty(localUser) || localUser.length > 0) {
      props.setUserObject(localUser);
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
    props.setUserObject(null);
    console.log("Logout User");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }


  function logUserLocally(user) {
    props.setUserObject(user);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  }


  function isLoggedIn() {
    if (userObj != null && !isEmpty(userObj)) {
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
