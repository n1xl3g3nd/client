import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";

import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { check } from "./http/userApi";
import io from "socket.io-client";

const App = observer(() => {
    const { user, socket,  } = useContext(Context);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!user.isAuth && !token) {
        return undefined;
      } else {
        check().then((data) => {
          if (data) {
            user.setUser(data);
            user.setIsAuth(true);
            if(socket){
              socket.emit('updateUserInfo',{
                socketId: socket.id,
                userId: user.user.id
            })}
           
         
        }
        });
      }
  
     
    }, [user.isAuth, user.user.id, socket]);
  
    return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );
  });

export default App;