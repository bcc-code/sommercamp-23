<template>
    <div class="grid grid-cols-5">
        <div v-for="option in options" :key="option">
            {{  $t(getOption(option)) }}
            <div class="w-full flex gap-x-2 items-center" v-if="!votesAreOpen">
                <div class="w-full h-4 bg-beige bg-opacity-10 rounded-full">
                    <div class="h-4 rounded-full" :class="['bg-dark-yellow', 'bg-orange'][Number(option)-1]" :style="{ width:  + optionPercent(option) + '%' }"></div>
                </div>  
                <span class="text-lg font-bold">{{ optionPercent(option) }}%</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { doc, getFirestore } from 'firebase/firestore'
import { useFirestore } from '@vueuse/firebase'
import { useI18n } from 'vue-i18n';
const db = getFirestore()

const state = useFirestore(doc(db, 'states', 'boy'), null)
const votesAreOpen = computed(() => state.value && state.value.question == '0a')

const result = useFirestore(doc(db, 'questions', '0a'), null)
const optionPercent = (option: string) => result.value && result.value.options[option] || 0

const { getLocaleMessage, locale } = useI18n()
const options = computed(() => Object.keys((getLocaleMessage(locale.value)['questions'] as { [key: string]: any })['0a']['options']))
const getOption = (option: string) =>   `questions.0a.options.${option}`
</script>
