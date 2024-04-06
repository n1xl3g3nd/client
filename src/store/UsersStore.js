import {makeAutoObservable} from "mobx"
export default class UsersStore {
    constructor(){
        
        
        this._users = [
           
        ]   
        
        
        this._page=1
        this._totalCount=0
        this._limit=10

        makeAutoObservable(this)
        
    }
    
    
    setUsers = (users) =>{
        this._users = users
    }
   
    
    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
   
    
    get users(){
        return this._users
    }
   
    get page(){
        return this._page
    }
    get totalCount(){
        return this._totalCount
        
    }
    get limit(){
        return this._limit
    }
}
