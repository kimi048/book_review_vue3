import { defineStore } from 'pinia';
import axios from "axios";

declare const ENV_BASE: string;
declare const ENV_API_KEY: string;
const BASEURL ="https://api.airtable.com/v0/"+ENV_BASE+"/Reviews";
const URL = "https://api.airtable.com/v0/"+ENV_BASE+"/Reviews?api_key="+ENV_API_KEY;
// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useReview = defineStore('review', {
  // a function that returns a fresh state
  state: () => ({
    counter: 0,
    name: 'Eduardo',
    book_title:'',
    reviews:[]
  }),
  // optional getters
  getters: {
    
  },
  // optional actions
  actions: {
    async fetchMyReviews(username:string){
      return await axios.get(URL,{params:{filterByFormula:"{reviewer}='"+username+"'"}})
      .then(res => {
        // console.log(res.data);
        return res.data;
      })
    },
    deleteReview(id:string){
      axios.delete(BASEURL+"/"+id,{
        headers:{
          "Authorization":"Bearer key0CcvAWeyENlW6n",
          "Content-Type":"application/json"
        }
      }).then(
        res => {
          console.log("reviewbyid");
          console.log(res.data);
          return res.data;
        }
      )
    },
    reviewById(id:string){
      axios.get(BASEURL+"/"+id,{
        headers:{
          "Authorization":"Bearer key0CcvAWeyENlW6n",
          "Content-Type":"application/json"
        }
      }).then(
        res => {
          console.log("reviewbyid");
          console.log(res.data);
          return res.data;
        }
      )
    }
  },
})