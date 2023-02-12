<template>
    <Settings v-if="!settings" @submit="settings = $event"/>
    <div v-else-if="state" class="px-4 py-8 text-center">
        <template v-if="state.question == '0'">
            <p>Waiting for the next question...</p>
        </template>
        <div v-else class="flex flex-col justify-center space-y-5">
            <p class="text-xl">{{ $t(`questions.${state.question}.text`) }}</p>
            <button @click="submitAnswer(1)" class="bg-slate-400 py-3 rounded">{{ $t(`questions.${state.question}.options.1`) }}</button>
            <button @click="submitAnswer(2)" class="bg-slate-400 py-3 rounded">{{ $t(`questions.${state.question}.options.2`) }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { doc, getFirestore } from 'firebase/firestore'
import { useFirestore } from '@vueuse/firebase'
import { useStorage } from '@vueuse/core';
const db = getFirestore()

interface Settings {
    gender: string
    locale: string
}

const settings = useStorage<Settings | null>('paske-2023-settings', null, undefined,
    { 
        serializer: {
            read: (v: any) => v ? JSON.parse(v) : null,
            write: (v: any) => JSON.stringify(v),
        }
    }
)
const stateRef = computed(() => settings.value && doc(db, 'states', settings.value!.gender))
const state = useFirestore(stateRef, null)

const submitAnswer = (option: number) => {
    console.log("SUBMITTING ANSWER ", option)
}
</script>
