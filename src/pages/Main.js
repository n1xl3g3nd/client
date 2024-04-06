import React, { useContext, useEffect, useState } from 'react'

import NewsList from '../components/NewsComponents/NewsList'
import { fetchNews, fetchTypes } from '../http/deviceApi'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import Pages from '../components/NewsComponents/Pages'
import NavContent from '../navbars/NavContent'
import styles from '../static/css/news.module.css'
const Main = observer(() => {
  const {news} = useContext(Context)
  const {user} = useContext(Context)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const userIdFromLocalStorage = localStorage.getItem('userId');
  const userId = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage) : user.user.id;
  console.log(windowWidth)
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  console.log(news)
  useEffect(()=>{
    fetchTypes().then(data=> news.setTypes(data ))
    fetchNews().then(data=>news.setNews(data.rows))
    fetchNews().then(data=>news.setTotalCount(data.count))
    
  },[news]) 
  useEffect(()=>{
    if(news.friendsInFilter===true){
      console.log('eqeqe')
      fetchNews(news.selectedType.id,news.page,3,true,userId).then(data=>
        {news.setNews(data.rows)
        news.setTotalCount(data.count)
        }
      )
    }else{
      fetchNews(news.selectedType.id,news.page,3,).then(data=>
        {news.setNews(data.rows)
        news.setTotalCount(data.count)
        }
      )
    }
    
  },[news.page,news,news.selectedType.id,news.friendsInFilter])
if(windowWidth>600){
  return (
    <div className={styles.container}>
      <NavContent/>
      <NewsList/>
      <Pages/>
    </div>
  )
}
else{
  return (
    <div className={styles.container}>
      <NewsList/>
      <Pages/>
      <NavContent/>
    </div>
  )
}
})


 

export default Main
