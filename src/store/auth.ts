import { defineStore } from 'pinia';
import axios from "axios";

const URL = "https://api.airtable.com/v0/"+ENV_BASE+"/Users?api_key="+ENV_API_KEY;
// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useAuth = defineStore('auth', {
  // a function that returns a fresh state
  state: () => ({
    isLogin: false,
    username: null,
    id: null
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
    submitLogin(username:string, password:string){
      axios.get(URL,{params:{filterByFormula:"AND({Name}='"+nickname+"',{Password}='"+password+"')"}})
      .then((res)=>{
        console.log(res.data);
        console.log("2:",+res.data.records.length);
        if(res.data.records.length==0){
          console.log("No user matched");
        }else if(res.data.records.length==1){
          console.log("User found!");
        }
      })
      .catch((err)=>{console.error(err)});
      
    },
    submitSignUp(username:string, password:string){
      axios.post(URL,{
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
      }).then((res)=>{console.log(res.data)})
      .catch((err)=>{console.error(err)});
    }
    // reset() {
    //   // `this` is the store instance
    //   this.counter = 0
    // },
  },
})