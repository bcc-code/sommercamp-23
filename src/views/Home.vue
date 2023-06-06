<template>
    <Transition mode="out-in">
        <Spinner v-if="settings === undefined" class="mx-auto pt-36" />
        <Settings v-else-if="settings === null" @submit="updateSettings"/>
        <template v-else-if="isFinished">
            <div class="flex flex-col space-y-8 text-center px-20 py-16">
                <h1 class="text-3xl font-bold" >Takk for at du deltok!</h1>
                <h1 class="text-xl font-light px-8">Thank you for participating!</h1>
            </div>
        </template>
        <template v-else-if="!currentQuestion || currentAnswer">
            <div class="flex flex-col space-y-8 text-center px-20 py-16">
                <h1 class="text-3xl font-bold" >Venter på neste runde...</h1>
                <h1 class="text-xl font-light px-8">Waiting for the next round...</h1>
            </div>
        </template>
        <div v-else class="flex flex-col justify-between h-full space-y-8 text-center px-16 py-8">
            <div class="flex flex-col">
                <span class="text-sm font-bold">Runde/Round</span>
                <span class="text-sm font-light">{{currentStep}}/3</span>
            </div>
            <div class="flex flex-col space-y-3">
                <h1 class="text-xl font-bold">{{ currentQuestion.nb }}</h1>
                <div class="h-1 w-16 mx-auto bg-white"></div>
                <h1 class="text-base font-light">{{ currentQuestion.en }}</h1>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <button v-for="(team, idx) in teams" :key="team"
                    @click="answer = (answer == teamLeaders[idx]) ? undefined : teamLeaders[idx]"
                    class="w-full h-16 font-bold py-1 transition-opacity"
                    :class="[`bg-${team}`, {
                        'glow': answer && answer == teamLeaders[idx],
                        'cursor-default': answer,
                        'opacity-40': answer && answer != teamLeaders[idx]
                    }]">
                    {{ teamLeaders[idx] }}
                </button>
            </div>
            <div class="w-full text-center flex-grow flex flex-col justify-center">
                <button type="button" :disabled="!answer"
                    @click="submitAnswer(answer!)"
                    :class="{ 'opacity-50': !answer }"
                    class="bg-red text-white transition-opacity mx-auto">
                    Bekreft/Confirm
                </button>
                <span></span>
            </div>
        </div>
    </Transition>
    <img class="w-56 mx-auto object-cover" src="/img/logo.webp">
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSettings } from '@/composables/settings'
import { useState } from '@/composables/state'
import { useQuestions } from '@/composables/questions'
import { useTeams } from '@/composables/teams'
import { getAuth, setPersistence, browserLocalPersistence, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { useCurrentAnswer } from '@/composables/currentAnswer'

const auth = getAuth();
setPersistence(auth, browserLocalPersistence)
signInAnonymously(auth)
onAuthStateChanged(auth, (user) => console.log(user))

const { settings, updateSettings } = useSettings()
const { teams, teamLeaders} = useTeams()
const questions = useQuestions()
const state = useState()

const answer = ref<string>()
const { currentAnswer, submitAnswer } = useCurrentAnswer()

const currentQuestion = computed(() => {
    if (!state.question.value) return null
    return questions.getById(state.question.value)
})

const currentStep = computed(() => {
    if (!state.question.value) return 0
    return Number(state.question.value.slice(-1))
})

const isFinished = computed(() => {
    if (!state.question.value) return false
    return state.question.value == 'p3'
})

watch(currentQuestion, () => answer.value = undefined)
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}


</style>
