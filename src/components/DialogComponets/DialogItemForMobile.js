import React, { useContext, useState } from 'react'

import styles from '../../static/css/dialogsAndMesssages.module.css'


import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { DIALOGS_ROUTE } from '../../utils/consts'
//откати код в стостояние "раскрытие новости полностью"
const DialogItemForMobile = observer(({dialogs}) => {
  console.log(dialogs)
  const {user} = useContext(Context)
  const userIdFromLocalStorage = localStorage.getItem('userId');
  const userId = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage) : user.user.id;
  const navigate = useNavigate()
  console.log(userId, dialogs.currentUser.id)
  if(userId === dialogs.currentUser.id){
    return (
   
      <div className={styles.BlockOfOneNew}  onClick={()=> navigate(DIALOGS_ROUTE + '/' + dialogs.friendInDialog.id)}>
          <div className={styles.ImageAndTextBlock}>

             <div>
              {dialogs.friendInDialog.image 
             ?<img width={55} height={50} className={styles.NavImg} src={process.env.REACT_APP_API_URL + dialogs.friendInDialog.image }/>
             :null
             }
             </div>
             <div className={styles.textInDialogsVariantsBlock}>
              <p className={styles.textInDialogsVariants}>{dialogs.friendInDialog.name}</p>
              
              </div>
               </div>
              <div className={styles.LastTextBlockForMobile}>
              <p className={styles.LastText}>пока что последнее сообщение</p>
              </div>
          </div>
          
         
          
     
    )
  }else{
    return (
   
      <div className={styles.BlockOfOneNew}  onClick={()=> navigate(DIALOGS_ROUTE + '/' + dialogs.currentUser.id)}>
          <div className={styles.ImageAndTextBlock}>

             <div>
              {dialogs.currentUser.image 
             ?<img width={55} height={50} className={styles.NavImg} src={process.env.REACT_APP_API_URL + dialogs.currentUser.image }/>
             :null
             }
             </div>
             <div className={styles.textInDialogsVariantsBlock}>
              <p className={styles.textInDialogsVariants}>{dialogs.currentUser.name}</p>
              
              </div>
               </div>
              <div className={styles.LastTextBlockForMobile}>
              <p className={styles.LastText}>пока что последнее сообщение</p>
              </div>
          </div>
          
         
          
     
    )
  }
  
 
})
export default DialogItemForMobile
