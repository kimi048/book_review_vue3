<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from "../store/auth";
import { useReview } from '../store/review';
import {storeToRefs} from 'pinia';

const Auth = useAuth();
const Review = useReview();

//init auth
let {isLoggedin, username, id} = storeToRefs(Auth);
isLoggedin.value = Auth.loadIsLoggedin()!;
username.value = Auth.loadUsername()!;
id.value = Auth.loadId()!;
</script>

<template>
  <h1>review</h1>

  
</template>