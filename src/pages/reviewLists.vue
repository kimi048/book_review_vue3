<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
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

const allReviews = async() => await Review.allReviews();
const deleteReview = (id:string) => Review.deleteReview(id);
let { reviews } = storeToRefs<any>(Review);

onMounted(async() => {
  const data = await allReviews();
  reviews.value = data.records;
  console.log(reviews.value);
});
</script>

<template>
  <h1>review</h1>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-md sm:rounded-lg">
                <table class="min-w-full">
                    <thead class="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Book Title
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Reviewer
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Rating
                            </th>
                            <th scope="col" class="relative py-3 px-6">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Product 1 -->
                        <tr class="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600" v-for="review in reviews">
                            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{review.fields.book_title}}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{review.fields.reviewer}}
                            </td>
                            
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{review.fields.rating}}
                            </td>
                            <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                              <div v-if="review.fields.reviewer==username">
                                <router-link :to="'/review/'+review.id" class="text-blue-600 dark:text-blue-500 hover:underline mr-5 inline-block">Edit</router-link>
                                <p @click="deleteReview(review.id)" class="text-red-600 dark:text-red-500 hover:underline inline-block">Delete</p>
                              </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
  <button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded" v-on:click="allReviews">fetch</button>
  
</template>