import React, { useContext, useState } from 'react'
import fakeImg from '../../fakeStatic/fakeJpg.png'
import styles from '../../static/css/news.module.css'
import { useEffect } from 'react'
import { fetchRating, sendRating } from '../../http/deviceApi'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import likesImg from '../../static/images/Vector.svg'
import likedImg from '../../static/images/likedImage.svg'
import commentsImg from '../../static/images/comments.svg'
//откати код в стостояние "раскрытие новости полностью"
const NewsItem = observer(({news}) => {
    
    const [expanded, setExpanded] = useState(false)
    const {user} = useContext(Context)
    const [likes,setLikes] = useState(0)
    const [liked,setLiked] = useState(false)
    console.log(news,news.createdAt,likes)
      const truncatedText = news.text.slice(0, 100)
      const showExpandLink = news.text.length > 100
      const userIdFromLocalStorage = localStorage.getItem('userId');
      const userId = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage) : user.user.id;
      const handleExpand = (e) => {
        e.preventDefault()
        setExpanded(!expanded)
      } 
      useEffect(() => {
        fetchRating(news.id).then((data)=> {
          setLikes(data.length)
          console.log(data)
          const userLiked = data.some((rating) => rating.userId === userId);
          if(userLiked){
            setLiked(true)
          }else{
            setLiked(false)
          }
        })
      }, [news]) 
      const doLike = (e) =>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('newsId', news.id);
        sendRating(formData).then((data)=> {
          setLikes(data.length)
          console.log(data)
          const userLiked = data.some((rating) => rating.userId === userId);
          if(userLiked){
            setLiked(true)
          }else{
            setLiked(false)
          }
        })
        
        console.log(userId,news.id)
      }
      console.log(news)
  return (
    <div className={styles.BlockOfOneNew}>
      <div className={styles.HeaderUserAndTime}>
        <div className={styles.nameAndImage}>
          <p className={styles.userName}>{news.user.name}</p>
        </div>
        <div className={styles.imageBlock}>
        {news.user.image 
             ?<img className={styles.image} src={process.env.REACT_APP_API_URL + news.user.image}/>
             :null
             }

        </div>
      </div>
      <div className={styles.timeBlock}>
        <p className={styles.time}>20.02.2000</p>
      </div>
      <div className={styles.ContentNew}>
        <p className={styles.ContentNewText}>{expanded ? news.text : truncatedText}</p>
      </div>
      {showExpandLink && (
        <div className={styles.ahreafBlock}>
          <a href='#' className={styles.ahref} onClick={handleExpand}>
            {expanded ? 'скрыть' : 'показать'}
          </a>
        </div>
      )}
      <div className={styles.NewImageBlock}>
        {news.image
        ? <img className={styles.img} src={process.env.REACT_APP_API_URL + news.image}/>
        : null
        }
      </div>
     <div className={styles.BlockOfLikesAndComments}>
      <div className={styles.likesBlock}>
        <div className={styles.BlockImg}>
          
        <a href='#' onClick={doLike}>
          {liked
            ? <img src={likedImg} className={styles.LikesImg}>
            </img>
            : <img src={likesImg} className={styles.LikesImg}>
            </img>
          }
          </a>
        </div>
        <div className={styles.TextBlockLikes}>
          <p className={styles.TextInLikes}>{likes}</p>
        </div>
      </div>
      <div className={styles.commentsBlock}>
        <div className={styles.BlockImg}>
        <img src={commentsImg} className={styles.LikesImg}></img>
        </div>
        <div className={styles.TextBlockComments}>
          <p className={styles.TextInComments}>
            5
          </p>
        </div>
      </div>
     </div>
    </div>
  )
})

export default NewsItem
