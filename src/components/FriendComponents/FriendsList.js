import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import FriendItem from './FriendsItem.js'
import styles from '../../static/css/friends.module.css'
import PaginationForFriends from './PaginationForFriends.js'

const FriendsList = observer(() => {
  const { users } = useContext(Context)

  return (
    <div className={styles.MainBlock}>
      <div className={styles.MainContainer}>
      {users.users.map(userSite => (
        console.log(userSite),
        <FriendItem key={userSite.id} userInSite={userSite} />
      ))}
      <PaginationForFriends />
      </div>
    </div>
  )
})

export default FriendsList
