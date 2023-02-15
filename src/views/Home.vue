<template>
    <Settings v-if="!(settings && settings.gender)" @submit="settings = $event"/>
    <div v-else-if="state" class="px-4 text-center">
        <template v-if="state.question == '0'">
            <p>{{$t('waiting')}}</p>
        </template>
        <div v-else class="flex flex-col space-y-5">
            <p class="text-4xl text-shadow">{{ $t(`questions.${state.question}.text`) }}</p>
            <button v-for="option in ['1', '2']" :key="'option-' + option"
                @click="submitAnswer(option)" 
                class="font-semibold py-5"
                :class="{
                    'cursor-default': answer,
                    'opacity-50': answer && answer != option,
                    // TODO: Add a glowing effect on selected answer
                    'bg-dark-yellow': option == '1',
                    'bg-orange': option == '2'
                }">{{ $t(`questions.${state.question}.options.${option}`) }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, computed, watch } from 'vue'
import { doc, getFirestore } from 'firebase/firestore'
import { useFirestore } from '@vueuse/firebase'
import { useLocalStorage } from '@vueuse/core';
const db = getFirestore()

const settings = useLocalStorage('pc23-options', {}) as any

const stateRef = computed(() => settings.value && settings.value!.gender && doc(db, 'states', settings.value!.gender))
const state = useFirestore(stateRef, null)
let answer = ref<string | null>(null)
watch(() => state.value && state.value.question, () => {
    answer = useLocalStorage<string | null>('pc23-question-' + state.value!.question, null)
})

const submitAnswer = (option: string) => {
    if (answer.value) return;
    answer.value = option;
    // Uncomment this line when ready to test E2E
    //axios.get(`https://counterp23.bcc.media/count/${state.value.question}/${option}`)
}
</script>
