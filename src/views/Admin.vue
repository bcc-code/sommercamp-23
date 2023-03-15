<template>
    <AdminLogin v-if="!adminUser" @submit="Login($event.username, $event.password)"/>
    <template v-else>
        <div class="px-8 pt-16 pb-12 h-full flex flex-col justify-between">
            <div class="rounded-md bg-taupe shadow text-center px-6 py-8">
                <template v-if="currentStepQuestions.length == 0">
                    <h2 class="text-4xl">No question selected</h2>
                </template>
                <div v-else :class="currentStepQuestions.length > 1 ? 'grid md:grid-cols-2 gap-x-5' : 'w-3/4 mx-auto'">
                    <Question v-for="(questionId, idx) in currentStepQuestions" :key="questionId" :column="idx" :question="getQuestionById(questionId)" />
                </div>
            </div>
            <div class="flex flex-col space-y-8">
               <Sequence class="mx-auto" :items="sequence" :currentStep="currentStepIndex"/>
                <div class="md:w-1/2 md:mx-auto grid grid-cols-2 gap-x-5 h-20">
                    <button :class="{ 'opacity-50 cursor-default' : !canGoPrevious }" class="bg-dark-yellow" @click="previous">Previous</button>
                    <button :class="{ 'opacity-50 cursor-default' : !canGoNext }" class="bg-orange" @click="next">Next</button>
                </div> 
            </div> 
        </div>
    </template>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { useQuestions } from '@/composables/questions';
import { useAdmin } from '@/composables/admin';
import { useState } from '@/composables/state';

const { adminUser, Login} = useAdmin()
const { getQuestionById, isPause } = useQuestions()
const { states } = useState()
const db = getFirestore()

const sequence = [['p0'], ['0a'], ['p1'], ['1b', 'p1'], ['p2'], ['2b', '2g'], ['p3'], ['3g', 'p3'], ['p4'], ['4g', 'p4'], ['p5'], ['5b', 'p5'], ['p6'], ['6g', 'p6'], ['p7'], ['7b', 'p7'], ['p8']]

const currentStepIndex = ref<number>(0)
const currentStep = computed(() => sequence[currentStepIndex.value])
const currentStepQuestions = computed(() => currentStep.value.filter((q) => !isPause(q)))
const canGoPrevious = computed(() => currentStepIndex.value > 0)
const previous = () => { if (canGoPrevious.value) currentStepIndex.value--}
const canGoNext = computed(() => currentStepIndex.value < sequence.length - 1)
const next = () => { if (canGoNext.value) currentStepIndex.value++ }

watch(() => currentStep.value, async () => {
    let pauseStep = currentStep.value.find((q) => isPause(q)) || 'p0'
    let states: {[key: string]: string }= { boy: pauseStep, girl: pauseStep }
    if (currentStep.value && currentStep.value.every((q) => isPause(q))) states = { boy: currentStep.value[0], girl: currentStep.value[0] }
    else if (currentStep.value) currentStep.value.forEach((q) => {
        if (isPause(q)) return
        const targets = q.slice(-1) == 'b' ? ['boy'] : q.slice(-1) == 'g' ? ['girl'] : ['boy', 'girl']
        if (q) targets.forEach((t) => states[t] = q)
    })
    await Promise.all(Object.keys(states).map((gender) => updateDoc(doc(db, 'states', gender), { question: states[gender] })))
})

watch(() => states.value, () => {
    const questions = states.value.map((doc) => doc.question)
    const sequenceStepIndex = sequence.findIndex((s) => s && questions.every((q) => s.includes(q)))
    if (sequenceStepIndex < 0) return
    else currentStepIndex.value = sequenceStepIndex;  
})
</script>
