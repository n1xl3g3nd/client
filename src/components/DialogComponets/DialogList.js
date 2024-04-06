import React, { useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'
import logoImage from './static/dragon.png'
import styles from '../../static/css/dialogsAndMesssages.module.css'
import  DialogItem from './DialogItem'
import { fetchDialogs } from '../../http/DialogApi'

const DialogList = observer(() => {
const {dialogs} = useContext(Context)
const {user} = useContext(Context)
useEffect(() => {
  const userIdFromLocalStorage = localStorage.getItem('userId');
  const userId = userIdFromLocalStorage ? userIdFromLocalStorage : user.user.id;
  fetchDialogs(userId)
    .then(data => dialogs.setDialogs(data))
    .catch(error => {
      console.log(error.message);
    });
}, [dialogs, user.user.id]);
  console.log(dialogs.dialogs)
  
  return (
    <div className={styles.MainBlock}>
        <div className={styles.LogoDiv}>
          <div className={styles.Header}>
          <div className={styles.LogoImage}>
          <img src={logoImage} alt="Logo" className={styles.img} />
          </div>
          <div className={styles.LogoTextBlock}>
          <p className={styles.LogoText}>NFS</p>
          </div>
          </div>
          
          
          
        </div>
        {dialogs.dialogs.map(dialogItem => <DialogItem
         key={dialogItem.id} dialogs={dialogItem}/>)}
    </div>
  )
})

export default DialogList


