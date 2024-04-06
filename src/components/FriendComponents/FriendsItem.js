import React, { useContext, useState } from 'react'
import styles from '../../static/css/friends.module.css'
import { useEffect } from 'react'
import { fetchRating, sendRating } from '../../http/deviceApi'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { DIALOGS_ROUTE } from '../../utils/consts'
import { createFriends } from '../../http/FriendsApi'
import { createDialog } from '../../http/DialogApi'

const FriendsItem = observer(({ userInSite }) => {
  const { user,friends } = useContext(Context)
  const [FriendInSpisok, setFriendInSpisok] = useState(false)
  const navigate = useNavigate()
  const userIdFromLocalStorage = localStorage.getItem('userId');
  const userId = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage) : user.user.id;
  const isFriend = friends.friends.some(friend => friend.SecondUser.id === userInSite.id || friend.firstUser.id === userInSite.id);
  useEffect(() => {
    if (isFriend) {
      setFriendInSpisok(true);
    }
  }, [isFriend]);
  console.log(friends)
  const handleButtonClick = () => {
    if (FriendInSpisok) {
      createDialog(userId, userInSite.id).then(data=>{
        navigate(`${DIALOGS_ROUTE}/${userInSite.id}`);
      });
      
    } else {
      createFriends(userId, userInSite.id).then(data=>{
      setFriendInSpisok(true);
      });
    }
  }
  console.log(userInSite)
 
    return (
      <div className={styles.oneElementBlock}>
        <div className={styles.NameAndImage}>
        {userInSite.image 
             ?<img className={styles.image} src={process.env.REACT_APP_API_URL + userInSite.image}/>
             :<div className={styles.fakeImg}></div>
             }
          <div className={styles.textBlock}>
            <p className={styles.userName}>{userInSite.name}</p>
          </div>
          
        </div>
          <div className={styles.ButtonAddBlock}>
          {FriendInSpisok 
          ? <button className={styles.ButtonAdd} onClick={handleButtonClick}>В диалог</button>
          : <button className={styles.ButtonAdd} onClick={handleButtonClick}>Добавить</button>
        }

          </div>
      </div>
      
    )
  
})

export default FriendsItem