<template>
    <div class="overlay pt-12 px-24">
        <div class="relative mx-auto bg-dark-mint w-96 rounded-l-full px-16 py-6 mb-12 resultat">
            <h1 class="uppercase text-beige text-6xl">Resultat</h1>
        </div>
        <div class="w-full grid grid-cols-5 gap-x-5 gap-y-5">
            <div v-for="option in getOptions('0a')" :key="option" class="text-center">
                <img :src="`/img/0a/${option}.webp`" width="300" height="500" class="h-[350px] w-auto mb-2 mx-auto">
                <span v-if="!votesAreOpen" class="text-5xl text-beige font-bold">{{ optionPercent(question, option).toFixed(0) }}%</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { doc, getFirestore } from 'firebase/firestore'
import { useFirestore } from '@vueuse/firebase'
import { useOptions } from '@/composables/options';
import { useState } from '@/composables/state';
const db = getFirestore()

const { state } = useState('boy')
const votesAreOpen = computed(() => state.value && state.value.question == '0a')

const question = useFirestore(doc(db, 'questions', '0a'), null)
const { getOptions, optionPercent } = useOptions()

</script>
<style>

.overlay {
    width: 1920px;
    height: 1080px;
}

.resultat::after {
    content: ' ';
    position: absolute;
    left: 100%;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6.8rem 30px 0 0;
    border-color: theme('colors.dark-mint') transparent transparent transparent;
}
</style>