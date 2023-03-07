<template>
    <div class="overlay pt-12 px-12">
        <div class="relative mx-auto bg-dark-mint w-96 rounded-l-full px-16 py-6 mb-12 resultat">
            <h1 class="uppercase text-beige text-6xl">Resultat</h1>
        </div>
        <div class="w-full grid grid-cols-5 gap-x-5 gap-y-5">
            <div v-for="option in options" :key="option">
                <img :src="`/img/0a/${option}.webp`">
                <div class="w-full flex gap-x-2 items-center" v-if="!votesAreOpen">  
                    <span class="text-lg font-bold">{{ optionPercent(option) }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { doc, getFirestore } from 'firebase/firestore'
import { useFirestore } from '@vueuse/firebase'
import { useI18n } from 'vue-i18n'
const db = getFirestore()

const state = useFirestore(doc(db, 'states', 'boy'), null)
const votesAreOpen = computed(() => state.value && state.value.question == '0a')

const result = useFirestore(doc(db, 'questions', '0a'), null)
const optionPercent = (option: string) => result.value && result.value.options[option] || 0

const { getLocaleMessage, locale } = useI18n()
const options = computed(() => Object.keys((getLocaleMessage(locale.value)['questions'] as { [key: string]: any })['0a']['options']))
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