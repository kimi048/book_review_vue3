<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from "../store/auth";
import {storeToRefs} from 'pinia'
const Auth = useAuth();
let {isLoggedin, username, id} = storeToRefs(Auth);
isLoggedin.value = Auth.loadIsLoggedin()!;
username.value = Auth.loadId()!;
id.value = Auth.loadId()!;
</script>

<template>
  <h1>mypage</h1>

  
</template>