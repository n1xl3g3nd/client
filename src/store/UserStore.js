import {makeAutoObservable} from "mobx"
export default class UserStore {
    constructor(){
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)//при изменении этих компонентов они будут перерендериваться во всём проекте благоодаря makeAutoObservable
        
    }
    setIsAuth = (bool) =>{
        this._isAuth = bool
    }
    setUser = (user) =>{
        this._user = user
    }
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
}


