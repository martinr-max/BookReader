import React, {createContext, useCallback, useEffect, useState} from 'react';


export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  
  const [userId, setUserId] = useState(false);
  const [role, setRole] = useState('');
  const [userBookList, setUserBookList] = useState([]);

  const login = useCallback( (uid,  urole, uBookList) => {
    setUserId(uid);
    setRole(urole);
    setUserBookList(uBookList)
    localStorage.setItem(
      'userData',
      JSON.stringify({
         userId: uid,
         role: urole,
         userBookList: uBookList
      })
    )
  }, []);

  
  const logout = useCallback(() => {
    setUserId(null);
    setUserBookList(null);
    localStorage.removeItem('userData');
  }, []); 

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData) {
      login(storedData.userId, storedData.role, storedData.userBookList);
    }

  },[login]);

  return(
    <AuthContext.Provider value={{   
      userId,
      role: role,
      userBookList,
      isLoggedIn: userId !== null,
      login,
      logout   
    }}> {children}
    </AuthContext.Provider>
  )


}