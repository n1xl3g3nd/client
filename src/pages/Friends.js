import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../'
import NavContent from '../navbars/NavContent'
import FriendsList from '../components/FriendComponents/FriendsList'
import PaginationForFriends from '../components/FriendComponents/PaginationForFriends'
import { fetchFriends, fetchUsers,fetchAllFriends } from '../http/FriendsApi'

const Friends = observer(() => {
  const { friends, user, users } = useContext(Context)
  const userIdFromLocalStorage = localStorage.getItem('userId');
const userId = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage) : user.user.id;
console.log(users)
 useEffect(() => {
  fetchAllFriends(userId)
      .then(data => {
        console.log(data)
        friends.setFriends(data.rows)
        friends.setTotalCount(data.count)
      })
      .catch(error => {
        console.log(error.message)
      })
  }, [friends.page, friends.limit])
  useEffect(() => {
    fetchUsers( users.page, users.limit)
      .then(data => {
        console.log(data)
        users.setUsers(data.rows)
        users.setTotalCount(data.count)
      })
      .catch(error => {
        console.log(error.message)
      })
  }, [users.page, users.limit])
  return (
    <div>
      <NavContent />
      <FriendsList />
      
    </div>
  )
})

export default Friends
