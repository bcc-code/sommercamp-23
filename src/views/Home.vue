<template>
    <Settings v-if="!(settings && settings.gender)" @submit="settings = $event"/>
    <div v-else-if="state" class="px-4 text-center">
        <template v-if="state.question == '0'">
            <p>{{$t('waiting')}}</p>
        </template>
        <div v-else class="flex flex-col space-y-5">
            <p class="text-4xl text-shadow">{{ $t(`questions.${state.question}.text`) }}</p>
            <button @click="submitAnswer(1)" class="bg-dark-yellow font-semi py-5">{{ $t(`questions.${state.question}.options.1`) }}</button>
            <button @click="submitAnswer(2)" class="bg-orange py-5">{{ $t(`questions.${state.question}.options.2`) }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { doc, getFirestore } from 'firebase/firestore'
import { useFirestore } from '@vueuse/firebase'
import { useLocalStorage } from '@vueuse/core';
const db = getFirestore()

const settings = useLocalStorage('pc23-options', {}) as any

const stateRef = computed(() => settings.value && settings.value!.gender && doc(db, 'states', settings.value!.gender))
const state = useFirestore(stateRef, null)

const submitAnswer = (option: number) => {
    console.log("SUBMITTING ANSWER ", option)
}
</script>
