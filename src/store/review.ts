import { defineStore } from 'pinia';
import axios from "axios";
import { isTemplateNode } from '@vue/compiler-core';

declare const ENV_BASE: string;
declare const ENV_API_KEY: string;
const BASEURL ="https://api.airtable.com/v0/"+ENV_BASE+"/Reviews";
const URL = "https://api.airtable.com/v0/"+ENV_BASE+"/Reviews?api_key="+ENV_API_KEY;


type ReviewFields = {
  book_title?: string,
  date?: string,
  rating?: number,
  review?: string,
  reviewer?: string
}
type ReviewIndex = {
  id:string,
  fields:ReviewFields[]
}

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
    reviews:[],
    isNew:false
  }),
  // optional getters
  getters: {
    
  },
  // optional actions
  actions: {
    async fetchMyReviews(username:string){
      const res= await axios.get(URL,{params:{filterByFormula:"{reviewer}='"+username+"'"}})
      const data =res.data;
        // console.log(res.data);
        return data;
      
    },
    async deleteReview(id:string){
      const alert = confirm("本当に消去しますか？");
      if (alert){
        return await axios.delete(BASEURL+"/"+id,{
          headers:{
            "Authorization":"Bearer "+ENV_API_KEY,
            "Content-Type":"application/json"
          }
        }).then(
          res => {
            console.log("reviewbyid");
            console.log(res.data);
            this.reviews=this.reviews.filter((item:ReviewIndex)=> {return item.id!=id})
            return res.data;
          }
        )
      }
    },
    async reviewById(id:string|string[]){
      return await axios.get(BASEURL+"/"+id,{
        headers:{
          "Authorization":"Bearer "+ENV_API_KEY,
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
    async allReviews(){
      return await axios.get(BASEURL,{
        headers:{
          "Authorization":"Bearer "+ENV_API_KEY,
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
    async initFields(postid:string|string[]){
      const data = await this.reviewById(postid);
      this.book_title = data.fields.book_title;
      this.rating = data.fields.rating;
      this.review = data.fields.review;
      this.date = data.fields.date;
      this.reviewer = data.fields.reviewer;
      console.log("end of init Fields");
    },
    dateToString(date:Date){
      return date.toISOString().split('T')[0];
    },
    async newPost(username:string,book_title:string, rating:number, review:string){
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
          "Authorization":"Bearer "+ENV_API_KEY,
          "Content-Type":"application/json"
        }
      }).then((res)=>{
        console.log(res.data);
      })
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
          "Authorization":"Bearer "+ENV_API_KEY,
          "Content-Type":"application/json"
        }
      }).then((res)=>{console.log(res.data)})
      .catch((err)=>{console.error(err)});
    }
  },
})