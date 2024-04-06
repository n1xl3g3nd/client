import React, { useContext, useState } from 'react'
import styles from '../static/css/auth.module.css'
import { NavLink,useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userApi'
import {Context} from '../index'
import { observer } from 'mobx-react-lite'
import NavContent from '../navbars/NavContent'
import io from 'socket.io-client';
const Auth = observer(() => {
  const location = useLocation()
  const {user} = useContext(Context)
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email,setEmail] =  useState('')
  const [error, setError] = useState('');
  const [image,setImage] = useState(null)
  const [name,setName] =  useState('')
  const [password,setPassword] =  useState('')
  const navigate = useNavigate()
  const {socket,changeSocket} = useContext(Context)
  
  const click = async() =>{
    try{
      let data
      if(isLogin){
        data = await login(email,password)
        user.setUser(data)
        user.setIsAuth(true)
        localStorage.setItem('userId', data.id);
        const newSocket = io('http://localhost:7000');
        changeSocket(newSocket);

        console.log(newSocket);
        
        
        navigate(MAIN_ROUTE)
      }else {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);
        formData.append('name', name);
      
        data = await registration(formData);
        user.setUser(data)
        user.setIsAuth(true)
        localStorage.setItem('userId', data.id);
        navigate(MAIN_ROUTE)
        
      }
    }catch(e){
      console.log('fr')
      if(e.response && e.response.data){
        alert(e.response.data.message)
      }else{
        alert(e.message)
      }
    }
  }
  
  return (
    
    <div>
      <NavContent/>
      <div className={styles.mainBlock}>
        <div className={styles.content}>
        <div className={styles.authBlock}>
          <h1>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
        </div>
        {isLogin ? (
           <div className={styles.formBlock}>
           <div>
             <input
               className={styles.input}
               placeholder='введите ваш email'
               value={email}
               onChange={e => setEmail(e.target.value)}
             />
           </div>
           <div>
             <input
               type='password'
               className={styles.input}
               placeholder='введите ваш пароль'
               value={password}
               onChange={e => setPassword(e.target.value)}
             />
           </div>
         </div>
) : (
  <div className={styles.formBlock}>
<div>
  <input
    className={styles.input}
    placeholder='введите ваш email'
    value={email}
    onChange={e => setEmail(e.target.value)}
  />
</div>
<div>
  <input
  className={styles.input}
  placeholder='введите ваше имя(псевдоним)'
  value={name}
  onChange={e => setName(e.target.value)}
  />
           </div>
<div>
  <input
    type='password'
    className={styles.input}
    placeholder='введите ваш пароль'
    value={password}
    onChange={e => setPassword(e.target.value)}
  />
</div>

<div className={styles.formDiv}>
  <input type="file" onChange={e => setImage(e.target.files[0])} />
</div>
<div className={styles.formDiv}>
  {error && <p>{error}</p>}
</div>
</div>
)}
        
        <div className={styles.lastBlock}>
          <div className={styles.textBloclk}>
            <p>
              {isLogin ? 'Нет аккаунта?' : 'есть аккаунт?'}
              {isLogin ? (
                <NavLink to={REGISTRATION_ROUTE} className={styles.links}>
                  зарегист<br/>рироваться
                </NavLink>
              ) : (
                <NavLink to={LOGIN_ROUTE} className={styles.links}>
                  войти
                </NavLink>
              )}
            </p>
          </div>
          <div className={styles.btnBlock}>
            <button className={styles.btn} onClick={click}>
              {isLogin ? `Войти` : `Зарегистируйтесь`}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )})

export default Auth

