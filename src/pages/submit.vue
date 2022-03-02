<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from "../store/auth";
import {storeToRefs} from 'pinia'
const Auth = useAuth();
let {isLoggedin, username, id} = storeToRefs(Auth);
isLoggedin.value = Auth.loadIsLoggedin()!;
username.value = Auth.loadId()!;
id.value = Auth.loadId()!;

const count = ref(0)
</script>

<template>
  <h1>submit : {{$route.params.id}}</h1>

  
</template>