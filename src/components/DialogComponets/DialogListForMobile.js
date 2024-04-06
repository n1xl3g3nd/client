import React, { useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'
import logoImage from './static/dragon.png'
import styles from '../../static/css/dialogsAndMesssages.module.css'
import  DialogItem from './DialogItem'
import { fetchDialogs } from '../../http/DialogApi'
import DialogItemForMobile from './DialogItemForMobile'
import { NavLink } from 'react-router-dom'
import { MAIN_ROUTE } from '../../utils/consts'

const DialogListForMobile = observer(() => {
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
    <div className={styles.MainBlockForMobileDialog}>
        <div className={styles.LogoDivForMobile}>
          <div className={styles.LogoBlock}>
          <div className={styles.LogoImage}>
          <img src={logoImage} alt="Logo" className={styles.img} />
          </div>
          <div className={styles.LogoTextBlockForMobile}>
          <p className={styles.LogoText}>NFS</p>
          </div>
          </div>
          <NavLink to={MAIN_ROUTE} className={styles.NavLinks}>
              Главная
            </NavLink>
          
          
        </div>
        {dialogs.dialogs.map(dialogItem => <DialogItemForMobile
         key={dialogItem.id} dialogs={dialogItem}/>)}
    </div>
  )
})

export default DialogListForMobile


