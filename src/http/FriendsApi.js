import { $authHost,$host } from "./index";
import { InvalidTokenError, jwtDecode } from 'jwt-decode';
export const fetchFriends= async(id,page,limit=3) => {
    try {
      const { data } = await $host.get(`api/friends/getall/${id}`,{params:{
        page,limit,
      }});
      return data;
    } catch (e) {
      console.log(e.messsage)
      throw new Error(e.messsage);
    }
  };
  export const fetchAllFriends = async(id)=>{
    try {
      const { data } = await $authHost.get(`api/friends/getAllUsersForAdd/${id}`);
      return data;
    } catch (e) {
      console.log(e.messsage)
      throw new Error(e.messsage);
    }
  }
  export const fetchUsers= async(page,limit=10) => {
    try {
      const { data } = await $host.get(`api/user/getall/`,{params:{
        page,limit,
      }});
      return data;
    } catch (e) {
      console.log(e.messsage)   
      throw new Error(e.messsage);
    }
  };
  export const createFriends = async(user_id,friend_id)=>{
    try {
      const { data } = await $authHost.post(`api/friends/create/`,{user_id,friend_id});
      return data;
    } catch (e) {
      console.log(e.messsage)
      throw new Error(e.messsage);
    }
  }