<template>
    <div class="h-screen flex justify-center" :class="isAdmin ? '' : 'md:pt-4 md:pb-4'">
        <div class="max-w-full bg-dark-mint w-full h-full flex flex-col justify-center pb-24"
            :class="isAdmin ? '' : 'md:max-w-md md:shadow-lg md:rounded-xl'">
            <RouterView />
        </div>
    </div>  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { initializeApp } from 'firebase/app'
import { useRoute } from 'vue-router'

const route = useRoute()
const isAdmin = computed(() => route.path.startsWith("/admin"))
const firebaseConfig = {
    apiKey: "AIzaSyCbBVrHKMLR4M8j5bTCQnd2wIBgXaSLCdA",
    authDomain: "paske-2023.firebaseapp.com",
    projectId: "paske-2023",
    storageBucket: "paske-2023.appspot.com",
    messagingSenderId: "919249187918",
    appId: "1:919249187918:web:603880be758a00f21d7f1f"
};
initializeApp(firebaseConfig);
</script>
