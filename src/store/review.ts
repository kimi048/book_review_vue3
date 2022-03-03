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
    book_title:'',
    rating:0,
    reviewer:'',
    review:'',
    date:'',
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
    async reviewById(id:string|string[]){
      return await axios.get(BASEURL+"/"+id,{
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
    async initFields(id:string|string[]){
      const data = await this.reviewById(id);
      this.book_title = data.fields.book_title;
      this.rating = data.fields.rating;
      this.review = data.fields.review;
      this.date = data.fields.date;
      this.reviewer = data.fields.reviewer;
    },
    dateToString(date:Date){
      return date.toISOString().split('T')[0];
    },
    async newPost(username:string,book_title:string, rating:number, review:string){
      // console.log(username+"/"+book_title+"/"+rating+"/"+review);
      await axios.post(BASEURL,{
        "records":[
          {
              "fields":{
                  "reviewer": username,
                  "book_title":book_title, 
                  "rating":rating, 
                  "review":review, 
                  "date":this.dateToString(new Date())
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
    },
    async updatePost(id:string|string[],username:string,book_title:string, rating:number, review:string){
      console.log("update post");
      console.log(id);
      await axios.put(BASEURL,{
        "records":[
          {
              "id":id,
              "fields":{
                  "reviewer": username,
                  "book_title":book_title, 
                  "rating":rating, 
                  "review":review, 
                  "date":this.dateToString(new Date())
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
  },
})