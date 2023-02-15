<template>
    <AdminLogin v-if="!adminUser" @submit="Login($event.username, $event.password)"/>
    <template v-else>
        <div class="px-8 py-16 h-full flex flex-col justify-between">
            <div class="rounded-md bg-taupe shadow text-center p-12">
                <template v-if="!currentStep">
                    <p class="text-4xl">{{ $t('noQuestion') }}</p>
                </template>
                <div v-else :class="currentStep.length > 1 ? 'grid md:grid-cols-2 gap-x-5' : 'w-1/2 mx-auto'">
                    <Question v-for="(questionId, idx) in currentStep" :key="questionId" :column="idx" :question="getQuestionById(questionId)" />
                </div>
            </div>
            <div class="flex flex-col space-y-12">
               <Sequence class="mx-auto" :items="sequence" :currentStep="currentStepIndex"/>
                <div class="md:w-1/2 md:mx-auto grid grid-cols-2 gap-x-5 h-24">
                    <button :class="{ 'opacity-50 cursor-default' : !canGoPrevious }" class="bg-dark-yellow" @click="previous">Previous</button>
                    <button :class="{ 'opacity-50 cursor-default' : !canGoNext }" class="bg-orange" @click="next">Next</button>
                </div> 
            </div> 
        </div>
    </template>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { useFirestore, useAuth } from '@vueuse/firebase'

const db = getFirestore()
const auth = getAuth()

const Login = (username: string, password: string) => {
    setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithEmailAndPassword(auth, username, password)
        .catch(() => {
            //TODO: Show invalid credentials message
            console.log('Invalid username or password')
        })
    })
}

const { user } = useAuth(auth)

const adminUserQuery = computed(() => user.value && user.value.email && doc(db, 'admins', user.value.email))
const adminUser = useFirestore(adminUserQuery, null)

const questionsQuery = computed(() => adminUser.value && collection(db, 'questions'))
const questions = useFirestore(questionsQuery, [])
const getQuestionById = (questionId: string) => questions.value.find((q) => q.id == questionId) || null

const PAUSE = null
const sequence = [PAUSE, ['1'], PAUSE, ['1', '2'], PAUSE]
const currentStepIndex = ref<number>(0)
const currentStep = computed(() => sequence[currentStepIndex.value])
const canGoPrevious = computed(() => currentStepIndex.value > 0)
const previous = () => { if (canGoPrevious.value) currentStepIndex.value--}
const canGoNext = computed(() => currentStepIndex.value < sequence.length - 1)
const next = () => { if (canGoNext.value) currentStepIndex.value++ }

watch(() => currentStep.value, async () => {
    let states: {[key: string]: string }= { boy: '0', girl: '0' }
    if (currentStep.value) currentStep.value.forEach((q) => {
        const question = getQuestionById(q)
        if (question) states[question.target] = q 
    })
    await Promise.all(Object.keys(states).map((gender) => updateDoc(doc(db, 'states', gender), { question: states[gender] })))
})
</script>
