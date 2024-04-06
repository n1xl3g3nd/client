import { $authHost,$host } from "./index";
import { InvalidTokenError, jwtDecode } from 'jwt-decode';
export const createNews = async(news) =>{
    try{
        const {data} = await $authHost.post('api/news/create',news )
        return data
    }catch(e){
        console.log(e)
    }
    
}
export const fetchNews= async(typeId,page,limit=3,friendsInFilter,userId) => {
    try {
      const { data } = await $host.get('api/news/getALL',{params:{
        typeId,page,limit,friendsInFilter,userId
      }});
      return data;
    } catch (e) {
      console.log(e.messsage)
      throw new Error(e.messsage);
    }
  };
  export const fetchRating = async(id) => {
    try {
      const { data } = await $host.get('api/rating/getAll/' + id);
      return data;
    } catch (e) {
      console.log(e.messsage)
      throw new Error(e.messsage);
    }
  };
  export const sendRating = async(userId,newsId) => {
    try {
      const { data } = await $authHost.post('api/rating/create',userId,newsId);
      return data;
    } catch (e) {
      console.log(e.messsage)
      throw new Error(e.messsage);
    }
  };
  export const fetchTypes = async () => {
    try {
      const { data } = await $host.get('api/type/getall');
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to login');
    }
  };