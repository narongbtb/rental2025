import {defineStore} from "pinia"

export const userStore=defineStore("userAuth",{
    // State  => data function
    state:()=>({
        userId:localStorage.getItem("userId"),
        email:localStorage.getItem("email")
    }),
    //Getter => computed property
    getters:{
        getUser(){
            return this.userId;
        }
    },
    //action  => method property
    actions:{
        login(obj){
            this.userId=obj._id;
            this.email=obj.email;
            localStorage.setItem("userId",obj._id);
            localStorage.setItem("email",obj.email);
        },
        logout(){
            localStorage.clear();
            this.userId=null;
            this.email=null;
        }
    }
})