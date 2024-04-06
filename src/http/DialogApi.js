  //dialogApi.js
  import { $authHost,$host } from "./index";
  import { InvalidTokenError, jwtDecode } from 'jwt-decode';
  export const fetchDialogs = async(id) => {
    console.log(id)
      try {
        const { data } = await $authHost.get(`api/dialog/getall/${id}`,);
        return data;
      } catch (e) {
        console.log(e.messsage)
        throw new Error(e.messsage);
      }
      
    };
    export const createDialog = async(currentUserId,friendInDialogId) => {
      
        try {
          const { data } = await $authHost.post(`api/dialog/create/`,{currentUserId,friendInDialogId});
          return data;
        } catch (e) {
          console.log(e.messsage)
          throw new Error(e.messsage);
        }
        
      };
      export const getOneDialog = async(userId,friendId) => {
        console.log(friendId,userId,213123123131)
          try {
            const { data } = await $authHost.get(`api/dialog/getone/${userId}/friend/${friendId}`,);
            return data;
          } catch (e) {
            console.log(e.messsage)
            throw new Error(e.messsage);
          }
          
        };
        export const sendMessage = async (userId, friendId, formData) => {
          try {
              const { data } = await $authHost.post(`/api/messages/create/${userId}/${friendId}`, formData);
              return data;
          } catch (error) {
              console.error('Error sending message:', error.message);
              throw new Error(error.message);  // Rethrow the error to propagate it further
          }
      };