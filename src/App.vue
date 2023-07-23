<template>
    <div class="h-screen " :class="[isOverlay ? '' : 'flex justify-center main', isAdmin || isOverlay ? '' : 'md:pt-4 md:pb-4']">
        <RouterView v-if="isOverlay || isAdmin" />
        <div v-else class="relative max-w-full w-full h-full flex flex-col justify-between py-16 bg-cover bg-left-top"
            :style="{ backgroundImage: `url('/img/background.webp')` }"
            :class="'md:max-w-md md:shadow-xl md:rounded-xl'">
            <RouterView />
        </div>
        <span class="absolute bottom-5 right-5 text-white text-xs">v1.2</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { initializeApp } from 'firebase/app'
import { useRoute } from 'vue-router'

const route = useRoute()
const isOverlay = computed(() => route.path.startsWith('/overlay'))
const isAdmin = computed(() => route.path.startsWith("/admin"))

const firebaseConfig = {
    apiKey: "AIzaSyAeyyJtPPb-deIXwnlVGiKsYDtzcvQi7kg",
    authDomain: "sommercamp-23.firebaseapp.com",
    projectId: "sommercamp-23",
    storageBucket: "sommercamp-23.appspot.com",
    messagingSenderId: "745735327996",
    appId: "1:745735327996:web:ff0d484aaecee968178779"
}

initializeApp(firebaseConfig)

</script>