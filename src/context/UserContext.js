import React from 'react';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const userName = 'Adam Denais';
  const userEmail = 'adamdenais@gmail.com';

  return (
    <UserContext.Provider value={{ userName, userEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
