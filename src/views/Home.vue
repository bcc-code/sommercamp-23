<template>
    <Settings v-if="!gender" @submit="setSettings($event)"/>
    <Transition v-else-if="state" mode="out-in">
        <template v-if="!hasQuestion">
            <h3 class="text-center px-16 uppercase font-bold text-3xl" >{{$t('waiting')}}</h3>
        </template>
        <FirstQuestion v-else-if="isFirstQuestion" @submit="submitAnswer" :answer="answer"/>
        <div v-else class="text-center flex flex-col space-y-5 px-8 -mt-32">
            <h3 class="col-span-full mb-5 text-shadow px-13 uppercase font-bold text-3xl text-shadow-xl">{{ $t(getQuestionKey(state.question)) }}</h3>
            <button v-for="option in getOptions(state.question)" :key="'option-' + option"
                @click="submitAnswer(option)"
                class="w-full h-24 font-normal py-1 px-6 bg-contain bg-transparent bg-no-repeat bg-center transition-opacity"
				style="background-color: black; height: fit-content;"
                :class="{
                    'cursor-default': answer,
                    'opacity-40': answer && answer != option,
                    'text-lg': ['1b', '3g'].includes(state.question),
                    'text-base': ['7b'].includes(state.question),
                    'text-sm': ['2b', '2g', '5b', '6g', '4g'].includes(state.question)
                }"
                :style="{
					'border': `5px ` + ( option == 1 ? '#546e5a' : '#af9152' ) + ` solid`,
					'border-radius': ( option == 1 ? '50px 0px 0px 50px' : '0px 50px 50px 0px' ),
				}">{{ $t(getOption(state.question,option)) }}</button>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import FirstQuestion from '@/components/FirstQuestion.vue';
import { useOptions } from '@/composables/options';
import axios from 'axios'
import { ref, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core';
import { useState } from '@/composables/state';
import { useSettings } from '@/composables/settings';

const { settings, gender } = useSettings()
const { state, isFirstQuestion, hasQuestion } = useState()

const {  getOptions, getOption, getQuestionKey } = useOptions()

let answer = ref<string | null>(null)
watch(() => state.value && state.value.question, () => {
    answer = useLocalStorage<string | null>('pc23-question-' + state.value!.question, null)
})

const setSettings = (event) => {
	settings.value = event;
	window.location.reload()
}

const submitAnswer = (option: string) => {
    if (answer.value || !state.value) return;
	if (!confirm('Are you sure?')) {
		return
	}
    answer.value = option;
    axios.get(`https://counterp23.bcc.media/count/${state.value.question}/${option}`)
}
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}</style>
