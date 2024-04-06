import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MessageItem from '../MessageComponents/MessageItem';
import DialogList from '../DialogComponets/DialogList';
import styles from '../../static/css/dialogsAndMesssages.module.css';
import { MAIN_ROUTE } from '../../utils/consts';
import { Context } from '../..';

const DialogPageContent = observer(({
  dialog,
  onlineUsers,
  messageBlockRef,
  messageText,
  setMessageText,
  handleButtonClick,
}) => {
  const { user } = useContext(Context);
 
  const userIdFromLocalStorage = localStorage.getItem('userId');
const userId = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage) : user.user.id;
const [isShaking, setShaking] = useState(false);
const navigate = useNavigate()
const handleNavLinkClick = () => {
  setShaking(true);
  setTimeout(() => {
    setShaking(false);
    navigate(MAIN_ROUTE);
  }, 500); // Длительность анимации в миллисекундах
};
const friendDialogId = parseInt(dialog.friendInDialog?.id)
  console.log(userId, dialog.friendInDialog?.id);
  
return (
  <div className={styles.MainDiv}>
    <div className={styles.container}>
      <div className={styles.dialogList}>
        <DialogList />
      </div>
      <div className={styles.dialogBlock}>
        <div className={styles.header}>
          <div className={styles.FriendInfoDiv}>
            {userId === friendDialogId ? (
              <div className={styles.controlDiv}>
                <div className={styles.textInHeaderDiv}>
                  <div className={styles.textAndImage}>
                    {dialog.currentUser?.image ? (
                      <div className={styles.imageInHeaderDiv}>
                        <img
                          
                          className={styles.NavImg}
                          src={process.env.REACT_APP_API_URL + dialog.currentUser?.image}
                        />
                      </div>
                    ) : <div className={styles.fakeImageInHeaderDiv}></div>}
                    <div>
                    <p className={styles.headerName}>{dialog.currentUser?.name}</p>
                    </div>
                  </div>
                  <div className={styles.headerOnline}>
                    <p className={styles.online}>
                      {onlineUsers.some(user => user.userId === dialog.currentUser?.id) ? 'online' : 'offline'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.mainHeaderContrent}>
                <div className={styles.textInHeaderDiv}>
                  <div className={styles.textAndImage}>
                    {dialog.friendInDialog?.image ? (
                      <div className={styles.imageInHeaderDiv}>
                        <img
                          width={30}
                          height={30}
                          className={styles.NavImg}
                          src={process.env.REACT_APP_API_URL + dialog.friendInDialog?.image}
                        />
                      </div>
                    ) : <div className={styles.fakeImageInHeaderDiv}></div>}
                    <div className={styles.controlDiv}>
                    <p className={styles.headerName}>{dialog.friendInDialog?.name}</p>
                    </div>
                    
                  </div>
                  <div className={styles.headerOnline}>
                    <p className={styles.online}>
                      {onlineUsers.some(user => user.userId === friendDialogId) ? 'online' : 'offline'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.HeaderLinkBlock}>
          <div className={isShaking ? `${styles.shakeContainer} ${styles.shake}` : styles.shakeContainer}>
      <div className={styles.linkContainer}>
        <a 
          className={styles.NavLinks}
          onClick={handleNavLinkClick}
        >
          Главная
        </a>
      </div>
    </div>
          </div>
        </div>
        <div className={styles.messagesInputBlock}>
          <div className={styles.messageBlockInDialogPage} ref={messageBlockRef}>
            {Array.isArray(dialog.messages) &&
              dialog.messages.map(messageItem => (
                <MessageItem key={messageItem.id} message={messageItem} />
              ))}
          </div>
          <div className={styles.InputBlock}>
            <textarea
              className={styles.messageInput}
              type="text"
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
            />
            <button onClick={handleButtonClick}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)});
export default DialogPageContent ;