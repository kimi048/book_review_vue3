<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useAuth } from "@/store/auth";
import { useReview } from '@/store/review';
import {storeToRefs} from 'pinia';
  
const Auth = useAuth();
const Review = useReview();

//init auth
let {isLoggedin, username, id} = storeToRefs(Auth);
isLoggedin.value = Auth.loadIsLoggedin()!;
username.value = Auth.loadUsername()!;
id.value = Auth.loadId()!;

//init fields
let {book_title, rating, reviewer, review, date, isNew} = storeToRefs(Review);
console.log(date.value);
console.log((new Date()).toISOString().split('T')[0]);
// console.log(typeof rating.value);

//using route
const route = useRoute();
const router = useRouter();
isNew.value = route.params.id=="new" ? true : false;
onMounted(async()=>{
  if(!isNew.value){
    book_title.value="";
    rating.value=0;
    review.value=""
    await Review.initFields(route.params.id);
    
    console.log(reviewer.value);
    if(reviewer.value==''){
      router.push("/mypage");
    }
  }
})

const newPost = async() => {
  await Review.newPost(username.value,book_title.value,Number(rating.value),review.value);
  router.push("/mypage");
};
const updatePost = async() => {
  await Review.updatePost(route.params.id,username.value,book_title.value,Number(rating.value),review.value);
  router.push("/mypage");
}
</script>

<template>
  <div class="container">
    <h1>submit : {{$route.params.id}}</h1>
    <!-- <p>{{isNew?"New Post":"Edit Post"}}</p> -->
    <!-- <form @submit=""> -->
      <h3>{{isNew ? "New" : "Edit"}} Review</h3>
      <label for="book_title" class="block">Book Title</label>
      <input type="text" name="book_title" v-model="book_title" class="block">
      <label for="rating" class="block">Rating</label>
      <input type="text" name="ratiing" v-model="rating" class="block">
      <label for="review" class="block">Review</label>
      <textarea rows="10" cols="60" name="review" v-model="review" class="block"></textarea>
      
      <button class="bg-indigo-700 font-semibold text-white py-2 px-4 mt-5 rounded" v-on:click="isNew? newPost() : updatePost() ">{{isNew ? "新規作成" : "更新"}}</button>
  <!-- </form> -->
  </div>
</template>