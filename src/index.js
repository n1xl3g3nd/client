import React, { createContext, useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import UserStore from './store/UserStore';
import NewsStore from './store/NewsStore';
import io from 'socket.io-client';
import App from './App';
import FriendsStore from './store/FriendsStore';
import DialogsStore from './store/DialogStore';
import { observer } from 'mobx-react-lite';
import UsersStore from './store/UsersStore';


export const Context = createContext(null);

const ContextProvider = observer(({ children }) => {
  const userIdFromLocalStorage = localStorage.getItem('userId');
  console.log('userIdFromLocalStorage:', userIdFromLocalStorage);
  const [socket, setSocket] = useState(() => {
    if (userIdFromLocalStorage) {
      return io('http://185.112.102.22:7000');
    }
    return null; // или другая логика, если пользователь не залогинен
  });


  const changeSocket = (newSocket) => {
    setSocket(newSocket);
  };

  const contextValue = useMemo(
    () => ({
      user: new UserStore(),
      news: new NewsStore(),
      friends: new FriendsStore(),
      dialogs: new DialogsStore(),
      users: new UsersStore(),
      
      socket: socket,
      changeSocket: changeSocket,
    }),
    [socket]
  );

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);