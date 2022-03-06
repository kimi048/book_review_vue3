import { defineStore } from 'pinia';
import axios from "axios";

declare const ENV_BASE: string;
declare const ENV_API_KEY: string;
const URL = "https://api.airtable.com/v0/"+ENV_BASE+"/Users?api_key="+ENV_API_KEY;

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useAuth = defineStore('auth', {
  // a function that returns a fresh state
  state: () => ({
    isLoggedin: false,
    username: '',
    id: '',
    isSignUpPage: false
  }),
  // optional getters
  getters: {
    // // getters receive the state as first parameter
    // doubleCount: (state) => state.counter * 2,
    // // use getters in other getters
    // doubleCountPlusOne(): number {
    //   return this.doubleCount + 1
    // },
  },
  // optional actions
  actions: {
    getUsersList(){
      axios.get(URL)
      .then((res)=>{console.log(res.data)});
    },
    setLocalStorage(id:string,username:string,isLoggedin:boolean){
      localStorage.setItem('xxx-id',id);
      localStorage.setItem('xxx-username',username);
      localStorage.setItem('xxx-isLoggedin',isLoggedin.toString())
    },
    async submitLogin(username:string, password:string){
      await axios.get(URL,{params:{filterByFormula:"AND({Name}='"+username+"',{Password}='"+password+"')"}})
      .then((res)=>{
        console.log(res.data);
        console.log("2:",+res.data.records.length);
        if(res.data.records.length==0){
          console.log("No user matched");
        }else if(res.data.records.length==1){
          console.log("User found!");
          this.id = res.data.records[0].id;
          this.isLoggedin = true;
          this.username = res.data.records[0].fields.Name;
          console.log("id:"+this.$state.id+" / Username:"+this.$state.username);
          this.setLocalStorage(this.$state.id,this.$state.username,this.$state.isLoggedin);
        }
      })
      .catch((err)=>{console.error(err)});
      
    },
    async checkNamespace(username:string){
      const res:any = await axios.get(URL,{params:{filterByFormula:"{Name}='"+username+"'"}})
      if(res.data.records.length==0){
        console.log("username is available");
        return true;
      }else if(res.data.records.length==1){
        console.log("username is unavailable");
        return false;
      }else{
        console.log("something went wrong in namespace");
        return false;
      }
      
    }
    ,
    async submitSignUp(username:string, password:string){
      if(await this.checkNamespace(username)){
        await axios.post(URL,{
          "records":[
            {
                "fields":{
                    "Password": password,
                    "Name": username
                }
            }
        ]
        },{
          headers:{
            "Authorization":"Bearer key0CcvAWeyENlW6n",
            "Content-Type":"application/json"
          }
        }).then((res)=>{
          console.log(res.data);
          this.id = res.data.records[0].id;
            this.isLoggedin = true;
            this.username = res.data.records[0].fields.Name;
            console.log("id:"+this.$state.id+" / Username:"+this.$state.username);
            this.setLocalStorage(this.$state.id,this.$state.username,this.$state.isLoggedin);
        })
        .catch((err)=>{console.error(err)});
      }
    },
    async handleSubmit(isSignUp:boolean, username:string, password:string){
      if(isSignUp){
        if(username==""||password==""){
          this.isLoggedin=false;
          return;
        }else{
          await this.submitSignUp(username, password);
        }
      }else{
        await this.submitLogin(username, password);
      }
    },
    loadIsLoggedin(){
      if(localStorage.getItem('xxx-isLoggedin')){
        if(localStorage.getItem('xxx-isLoggedin')=="true"){
          return true;
        }else{
        return false;
        }
      }
    },
    loadUsername(){
      if(localStorage.getItem('xxx-username')){
        return localStorage.getItem('xxx-username');
      }
    },
    loadId(){
      if(localStorage.getItem('xxx-id')){
        return localStorage.getItem('xxx-id');
      }
    },
    clearLocalStorage(){
      localStorage.clear();
      this.id = '';
      this.username = '';
      this.isLoggedin = false;
    }
  },
})