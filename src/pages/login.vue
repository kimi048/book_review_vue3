<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from "../store/auth";
import {storeToRefs} from 'pinia'
import { useRouter } from 'vue-router';

const router = useRouter();

interface Form{
  username: string,
  password: string
}
let SignUpForm = ref<Form>({
  username: "",
  password: ""
})

const isSignUp = ref(false);
const Auth = useAuth();
let {isLoggedin, username, id} = storeToRefs(Auth);
isLoggedin.value = Auth.loadIsLoggedin()!;
username.value = Auth.loadId()!;
id.value = Auth.loadId()!;
// const submitLogin = () => Auth.submitLogin("kimi", "testing123");
// const submitSignUp = () => Auth.submitSignUp(SignUpForm.value.username, SignUpForm.value.password)
const handleSubmit = async() => {
      await Auth.handleSubmit(isSignUp.value,SignUpForm.value.username, SignUpForm.value.password);
      if(isLoggedin.value){router.push("/mypage");}
      console.log("Login? "+isLoggedin.value);
    }
    // .then(()=>{
    //   if(isLoggedin.value){router.push("/mypage");}
    //   console.log("Login? "+isLoggedin.value);
    //   })

const Logout = () => Auth.clearLocalStorage();


</script>

<template>
  
  <div class="container mx-auto px-4">
    <h1 class="text-3xl my-8">Welcome to ReviewPost</h1>
    <!-- <p @click="submitLogin">Login User</p>
    <p @click="submitSignUp">SignUp User</p> -->
    <p>isLoggedin : {{isLoggedin ? "true" : "false"}}</p>
    <p>username : {{username ? "true" : "false"}}</p>
    <p>id : {{id ? "true" : "false"}}</p>
    <div class="my-6">
      <label for="username">ユーザー名</label><br/>
      <input type="text" name="username" v-model="SignUpForm.username" class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    <div class="mb-6">
      <label for="password">パスワード</label><br/>
      <input type="password" name="password" v-model="SignUpForm.password" class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    <div class="mb-6 flex space-x-6">
        <button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded" v-on:click="handleSubmit">{{isSignUp ? "ユーザー作成" : "ログイン"}}</button>
        <button class="bg-blue-500 font-semibold text-white py-2 px-4 rounded" @click="isSignUp=!isSignUp">{{isSignUp ? "ログイン画面に切り替える" : "ユーザーを登録する"}}</button>
        <button class="bg-pink-500 font-semibold text-white py-2 px-4 rounded" @click="Logout">ログアウト</button>
    </div>

  </div>
  
</template>

