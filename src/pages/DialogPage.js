import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { fetchDialogs, getOneDialog, sendMessage } from '../http/DialogApi';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

import DialogPageContent from '../components/dialogPageRenderForPc/DialogPageComponent';
import DialogPageForMobileComponent from '../components/dialogPageRenderForMobiles/DialogPageForMobileComponent';

const DialogPage = observer(() => {
  const { id } = useParams();
  const [dialog, setDialog] = useState({});
  const [messageText, setMessageText] = useState('');
  const { user, socket } = useContext(Context);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [shouldScroll, setShouldScroll] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useLayoutEffect(() => {
    if (shouldScroll && messageBlockRef.current) {
      messageBlockRef.current.scrollTop = messageBlockRef.current.scrollHeight;
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the messages block when component mounts
    if (messageBlockRef.current) {
      messageBlockRef.current.scrollTop = messageBlockRef.current.scrollHeight;
    }
  }, [dialog.messages]);

  useEffect(() => {
    setShouldScroll(true)
    const userIdFromLocalStorage = localStorage.getItem('userId');
    const userId = userIdFromLocalStorage ? userIdFromLocalStorage : user.user.id;

    console.log('userId:', userId);
    socket.emit('checkStatus');

    getOneDialog(userId, id)
      .then(data => {
        console.log(data);
        setDialog(data);
        socket.emit('joinDialog', data.id);
      })
      .catch(error => {
        console.error('Error fetching dialog:', error);
      });

    const handleUpdateOnlineStatus = (updatedOnlineUsers) => {
      setOnlineUsers(updatedOnlineUsers);
    };
    const putNewMessageForPhone = (newMessage) => {
      console.log(newMessage);
      setDialog(prevDialog => ({
        ...prevDialog,
        messages: [ ...prevDialog.messages,newMessage],
    }));
    };
    const handleNewMessage = (newMessage) => {
      console.log(newMessage);
      setDialog(prevDialog => ({
        ...prevDialog,
        messages: [...prevDialog.messages,newMessage],
      }));

      const userIdFromLocalStorage = localStorage.getItem('userId');
      const userId = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage) : user.user.id;
      console.log(newMessage.senderId, userId);

      if (newMessage.senderId === userId) {
        setShouldScroll(true);
      }
    };
    if(windowWidth > 999){
      
      socket.on('newMessage', handleNewMessage);
    }else{
      socket.on('newMessage', putNewMessageForPhone);
    }
    socket.on('updateOnlineStatus', handleUpdateOnlineStatus);
    

    return () => {
      socket.off('updateOnlineStatus', handleUpdateOnlineStatus);
      socket.off('newMessage', handleNewMessage);
      socket.off('newMessage', putNewMessageForPhone);
    };
  }, [id, user.user.id]);

  const messageBlockRef = useRef(null);

  const handleButtonClick = async () => {
    try {
      const formData = new FormData();
      formData.append('text', messageText);
      formData.append('dialogId', dialog.id);
      const userIdFromLocalStorage = localStorage.getItem('userId');
      const userId = userIdFromLocalStorage ? userIdFromLocalStorage : user.user.id;
      const response = await sendMessage(userId, id, formData);
      
      socket.emit('createMessage', response.message, userId);

      setMessageText('');
    } catch (error) {
      console.error('Error handling button click:', error);
    }
  };

  return windowWidth > 999 ? (
    <DialogPageContent
      dialog={dialog}
      onlineUsers={onlineUsers}
      messageBlockRef={messageBlockRef}
      messageText={messageText}
      setMessageText={setMessageText}
      handleButtonClick={handleButtonClick}
    />
  ) : <DialogPageForMobileComponent
  dialog={dialog}
  onlineUsers={onlineUsers}
  messageBlockRef={messageBlockRef}
  messageText={messageText}
  setMessageText={setMessageText}
  handleButtonClick={handleButtonClick}
  />;
});

export default DialogPage;