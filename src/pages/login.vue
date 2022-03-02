<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from "../store/auth";
import {storeToRefs} from 'pinia'

interface Form{
  username: string,
  password: string
}
let SignUpForm = ref<Form>({
  username: "",
  password: ""
})

const Auth = useAuth();
const {isLogin, nickname, id} = storeToRefs(Auth);
const submitLogin = () => Auth.submitLogin("kimi", "testing123");
const submitSignUp = () => Auth.submitSignUp(SignUpForm.value.username, SignUpForm.value.password)


</script>

<template>
  <h1>Hi</h1>
  <p @click="submitLogin">Login User</p>
  <p @click="submitSignUp">SignUp User</p>
  <p>{{isLogin ? "true" : "hoge"}}</p>
  <p>{{nickname ? "true" : "hoge"}}</p>
  <p>{{id ? "true" : "hoge"}}</p>
  <div class="container">
    <div class="item">
      <input type="text" name="username" v-model="SignUpForm.username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    <div class="item">
      <input type="text" name="password" v-model="SignUpForm.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    <div class="item">
        <button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded" v-on:click="submitSignUp">作成</button>
    </div>

  </div>
  
</template>

