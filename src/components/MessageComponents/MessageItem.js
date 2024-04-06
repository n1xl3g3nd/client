import React, { useContext, useState } from 'react'

import styles from '../../static/css/dialogsAndMesssages.module.css'


import { Context } from '../..'
import { observer } from 'mobx-react-lite'
//откати код в стостояние "раскрытие новости полностью"
const MessageItem = observer(({message}) => {
const {user} = useContext(Context)
const userIdFromLocalStorage = localStorage.getItem('userId');
const userId = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage) : user.user.id;
console.log(message.receiverId, userId)    
    return (
    
   <div>
    {parseInt(message.senderId) === userId 
    ? 
    <div className={styles.messageBlock}>
    <div className={styles.messageTextBlock}>
    <p className={styles.messageText}>{message.text}</p>
    </div>
    </div>

    : 
    <div className={styles.messagePatentBlock}> 
    <div className={styles.messageBlockFriend}>
    <div className={styles.messageTextBlockFriend}>
    <p className={styles.messageText}>{message.text}</p>
    </div>
    </div>
    </div>
    }  
   
   </div> 
    )
  
  
 
})
export default MessageItem
