import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { DIALOGS_ROUTE, FRIENDS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, NEWS_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { Context } from '..';
import mainStyles from '../navbars/css/index.module.css';
import AuthStyles from '../navbars/css/NavForAuth.module.css';
import { observer } from 'mobx-react-lite';
import dragon from '../static/images/dragon.png';
const NavContent = observer(() => {
    const location = useLocation();
    const navigate = useNavigate()
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
    const isSpecificPage = location.pathname === REGISTRATION_ROUTE || location.pathname === LOGIN_ROUTE;
    const styles = isSpecificPage 
    ? AuthStyles 
    : mainStyles;
    
    const {user} = useContext(Context)
    const {socket} = useContext(Context)
    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        socket.disconnect();
        navigate(MAIN_ROUTE)
      };
   if(windowWidth>600){   
  return (
    <div className={styles.nav}>
    {user.isAuth
      ? 
      <div className={styles.navInner}>
          <div className={styles.navMenu}>
            <div className={styles.logoDiv}>
              <div className={styles.logoImage}>
                  <img src={dragon} alt="Logo" className={styles.img} />
              </div>
              <div className={styles.logoTextBlock}>
                <p className={styles.logoText}>MFS</p>
              </div>
            </div>
            <div className={styles.containerForNav}>
            <div className={styles.navMenuItem}><NavLink to={MAIN_ROUTE}className={styles.NavLinks}>Главная</NavLink></div>
            
            <div className={styles.navMenuItem}><NavLink to={FRIENDS_ROUTE}className={styles.NavLinks}>Друзья</NavLink></div>
            <div className={styles.navMenuItem}><NavLink to={DIALOGS_ROUTE}className={styles.NavLinks}>Диалоги</NavLink></div>
            <div className={styles.navMenuItem}><a onClick={logout} className={styles.NavLinks}>выйти</a></div>
            </div>
            <div className={styles.navMenuItemP}><p className={styles.NavP}>{user.user.name}</p>
             {user.user.image 
             ?<img width={30} height={30} className={styles.NavImg} src={process.env.REACT_APP_API_URL + user.user.image}/>
             :null
             }
              </div>
            
            
            

          </div>
      </div> 
      :
      <div className={styles.navInner}>
      <div className={styles.navMenu}>
      <div className={styles.logoDiv}>
              <div className={styles.logoImage}>
                  <img src={dragon} alt="Logo" className={styles.img} />
              </div>
              <div className={styles.logoTextBlock}>
                <p className={styles.logoText}>MFS</p>
              </div>
            </div>
      <div className={styles.containerForNav2}>
        <div className={styles.navMenuItem}><NavLink to={MAIN_ROUTE}className={styles.NavLinks}>Главная</NavLink></div>
        <div className={styles.navMenuItem}><NavLink to={NEWS_ROUTE}className={styles.NavLinks}>Новости</NavLink></div>
       
        <div className={styles.navMenuItem}><NavLink to={REGISTRATION_ROUTE}className={styles.NavLinks}>Авторизация</NavLink></div>
      </div>
      </div>
  </div> 
    
    }
     </div>
  )}else{
    return (
      <div className={styles.nav}>
      {user.isAuth
        ? 
        <div className={styles.navInner}>
            <div className={styles.navMenu}>
              <div className={styles.containerForNav}>
              <div className={styles.navMenuItem}>
                <div className={styles.containerLinks}></div>
                <NavLink to={MAIN_ROUTE}className={styles.NavLinks}>Новости</NavLink>
                </div>
              
              <div className={styles.navMenuItem}><NavLink to={DIALOGS_ROUTE}className={styles.NavLinks}>мессенджер</NavLink></div>
              
              
              <div className={styles.navMenuItemP}><p className={styles.NavP}>{user.user.name}</p>
               {user.user.image 
               ?<img width={30} height={30} className={styles.NavImg} src={process.env.REACT_APP_API_URL + user.user.image}/>
               :null
               }
               </div>
                </div>
              
              
              
  
            </div>
        </div> 
        :
        <div className={styles.navInner}>
        <div className={styles.navMenu}>
        <div className={styles.logoDiv}>
                <div className={styles.logoImage}>
                    <img src={dragon} alt="Logo" className={styles.img} />
                </div>
                <div className={styles.logoTextBlock}>
                  <p className={styles.logoText}>MFS</p>
                </div>
              </div>
        <div className={styles.containerForNav2}>
          <div className={styles.navMenuItem}><NavLink to={MAIN_ROUTE}className={styles.NavLinks}>Главная</NavLink></div>
          <div className={styles.navMenuItem}><NavLink to={NEWS_ROUTE}className={styles.NavLinks}>Новости</NavLink></div>
         
          <div className={styles.navMenuItem}><NavLink to={REGISTRATION_ROUTE}className={styles.NavLinks}>Авторизация</NavLink></div>
        </div>
        </div>
    </div> 
      
      }
       </div>
    )
  }
  
});

export default NavContent;