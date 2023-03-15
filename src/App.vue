<template>
    <div class="h-screen " :class="[isOverlay ? '' : 'flex justify-center main', isAdmin || isOverlay ? '' : 'md:pt-4 md:pb-4']">
        <RouterView v-if="isOverlay" />
        <div v-else class="relative max-w-full w-full h-full flex flex-col justify-center bg-cover bg-center transition-background-image filter"
            :style="{ backgroundImage: isAdmin ? '': `url('/img/${backgroundImageName}.webp')` }"
            :class="isAdmin ? 'bg-dark-mint' : 'md:max-w-md md:shadow-lg md:rounded-xl'">
            <RouterView />
        </div>
    </div>  
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { initializeApp } from 'firebase/app'
import { useRoute } from 'vue-router'
import { useState } from '@/composables/state';

const route = useRoute()
const isOverlay = computed(() => route.path.startsWith('/overlay'))
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

const { state, isFirstQuestion, hasQuestion } = useState()
const backgroundImageName = computed(() => {
    if (!hasQuestion.value) return 'background'
    else if (isFirstQuestion.value) return 'background'
    return state.value!.question
})

const preloadImages = () => {
    ['1b', '2b', '2g', '3g', '4g', '5b', '6g', '7b', 'option1', 'option2'].forEach((i) => {
        var img = new Image()
        img.src= '/img/' + i + '.webp'
    })
}

onMounted(preloadImages)
</script>
<style>
.transition-background-image {
    -webkit-transition: background-image 0.5s ease-in-out;
    transition: background-image 0.5s ease-in-out;
}
</style>