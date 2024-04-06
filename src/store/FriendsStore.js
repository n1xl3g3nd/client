import {makeAutoObservable} from "mobx"
export default class FriendsStore {
    constructor(){
        
        
        this._friends = [
           
        ]   
        
        
        this._page=1
        this._totalCount=0
        this._limit=3

        makeAutoObservable(this)
        
    }
    
    
    setFriends = (friends) =>{
        this._friends = friends
    }
   
    
    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
   
    
    get friends(){
        return this._friends
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
