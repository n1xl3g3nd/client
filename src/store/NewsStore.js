import {makeAutoObservable} from "mobx"
export default class NewsStore {
    constructor(){
        this._types = [
          
        ]
        
        this._news = [
           
        ]   
        this._selectedType = {}
        this._friendsInFilter = undefined
        this._page=1
        this._totalCount=0
        this._limit=3

        makeAutoObservable(this)
        
    }
    setTypes = (types) =>{
        this._types = types
    }
    setFriendsInFilter = (value) =>{
        this._friendsInFilter = value
    }
    setNews = (news) =>{
        this._news = news
    }
    setSelectedType(type){
        this._selectedType = type

    }
    
    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
    get types(){
        return this._types
    }
    
    get news(){
        return this._news
    }
    get selectedType(){
        return this._selectedType
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
    get friendsInFilter(){
        return this._friendsInFilter
    }
}
