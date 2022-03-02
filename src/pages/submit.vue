<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from "../store/auth";
const Auth = useAuth();

const count = ref(0)
</script>

<template>
  <h1>submit : {{$route.params.id}}</h1>

  
</template>