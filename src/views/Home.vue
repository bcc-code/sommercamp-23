<template>
    <Settings v-if="!(settings && settings.gender)" @submit="settings = $event"/>
    <template v-else-if="state">
        <template v-if="!hasQuestion">
            <h3 class="text-center px-12 uppercase font-bold text-3xl" >{{$t('waiting')}}</h3>
        </template>
        <FirstQuestion v-else-if="isFirstQuestion" @submit="submitAnswer" :answer="answer"/>
        <div v-else class="text-center flex flex-col space-y-5">
            <h3 class="col-span-full mb-5 text-shadow px-16 uppercase font-bold text-3xl text-shadow-xl">{{ $t(getQuestionKey(state.question)) }}</h3>
            <button v-for="option in getOptions(state.question)" :key="'option-' + option"
                @click="submitAnswer(option)" 
                class="w-full h-24 text-sm font-normal py-1 px-8 bg-contain bg-transparent bg-no-repeat bg-center"
                :class="{
                    'cursor-default': answer,
                    'opacity-50': answer && answer != option,
                }"
                :style="{ backgroundImage: `url(/img/option${option}.webp)` }">{{ $t(getOption(state.question,option)) }}</button>
        </div>
    </template>
</template>

<script setup lang="ts">
import FirstQuestion from '@/components/FirstQuestion.vue';
import { useOptions } from '@/composables/options';
import axios from 'axios'
import { ref, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core';
import { useState } from '@/composables/state';

const { state, settings, isFirstQuestion, hasQuestion } = useState()

const {  getOptions, getOption, getQuestionKey } = useOptions()

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
