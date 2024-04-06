import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode"
export const registration = async(formData) =>{
    const {data} = await $host.post('api/user/registration',formData)
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}
export const login = async(email,password) =>{
    const {data} = await $host.post('api/user/login',{email,password})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}
export const check = async () => {
    
    const { data } = await $authHost.get('api/user/auth');
    if(data.token){
      localStorage.setItem('token', data.token);
    
      return jwtDecode(data.token);
    }
   return null
    

};