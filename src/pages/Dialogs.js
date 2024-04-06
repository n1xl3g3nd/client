import React, { useContext, useEffect, useState } from 'react'
import NavContent from '../navbars/NavContent'
import { fetchDialogs } from '../http/DialogApi'
import { Context } from '..'
import DialogList from '../components/DialogComponets/DialogList'
import { observer } from 'mobx-react-lite'
import styles from '../static/css/dialogsAndMesssages.module.css'
import DialogListForMobile from '../components/DialogComponets/DialogListForMobile'

const Dialogs = observer(() => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  if(windowWidth > 999){
    return (
      <div className={styles.MainDiv}>
      <div className={styles.container}>
        <div className={styles.dialogList}>
          <DialogList />
        </div>
        <div className={styles.dialogBlock}>
          <div className={styles.header}></div>
          <div className={styles.ChooseDialog}>
            <p className={styles.ChooseDialogText}>Выберите диалог</p>
          </div>
          </div>
      </div>
      </div>
    )
  }
  return (
    <div className={styles.MainDiv}>
      <div className={styles.container}>
    <DialogListForMobile/>
      </div>
    </div>
  )
})

export default Dialogs