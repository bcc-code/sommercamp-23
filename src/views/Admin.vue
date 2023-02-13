<template>
    <AdminLogin v-if="!adminUser" @submit="Login($event.username, $event.password)"/>
    <template v-else>
        <div class="grid grid-cols-4 gap-x-5 px-8 py-16">
            <div class="overflow-hidden rounded-md bg-taupe shadow">
                <ul role="list" class="divide-y divide-beige">
                    <li class="px-6 py-4 cursor-pointer" v-for="question in questions" :key="'question-' + question" @click="selectedQuestionId = question.id"
                        :class="selectedQuestionId == question.id ? 'bg-yellow text-dark-brown' : 'hover:bg-beige hover:bg-opacity-10'">
                        {{ $t(getQuestion(question.id)) }}
                    </li>
                </ul>
            </div>
            <div class="col-span-3 h-full rounded-md bg-taupe shadow text-center p-12">
                <template v-if="!(selectedQuestionId && selectedQuestion)">
                    <p class="text-4xl">{{ $t('noQuestion') }}</p>
                </template>
                <div v-else class="space-y-12">
                    <h2 class="text-4xl">
                        {{ $t(getQuestion(selectedQuestionId)) }} &nbsp;
                        <span v-if="selectedTarget == 'girl'" class="inline-flex align-middle rounded-full bg-pink-100 px-3 py-0.5 text-base font-medium text-pink-800">Girls</span>
                        <span v-if="selectedTarget == 'boy'" class="inline-flex align-middle rounded-full bg-blue-100 px-3 py-0.5 text-base font-medium text-blue-800">Boys</span>
                    </h2>
                    <div class="flex flex-col space-y-5">
                        <div v-for="idx in ['1','2']" :index="'option-'+idx" class="flex items-center gap-x-2">
                            <p class="text-lg w-48">{{ $t(getOption(selectedQuestionId, idx)) }}</p>
                            <div class="w-full h-4 bg-beige bg-opacity-10 rounded-full">
                                <div class="h-4 rounded-full" :class="['bg-dark-yellow', 'bg-orange'][Number(idx)-1]" :style="{ width:  + optionPercent(idx) + '%' }"></div>
                            </div>  
                            <span class="text-lg font-bold">{{ optionPercent(idx) }}%</span>
                        </div>
                    </div>
                    <div class="mt-5 grid grid-cols-2 gap-x-5">
                        <button @click="openVotes" class="py-5 bg-yellow text-taupe text-lg font-semibold" :class="{ 'opacity-50' : votesAreOpen(selectedQuestionId) }">{{ $t('openVotes') }}</button>
                        <button @click="closeVotes" class="py-5 bg-dark-mint -500 text-beige text-lg font-semibold" :class="{ 'opacity-50' : !votesAreOpen(selectedQuestionId) }">{{ $t('closeVotes') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
const statesQuery = computed(() => adminUser.value && collection(db, 'states'))
const states = useFirestore(statesQuery, [])

const getQuestion = (index: string) => `questions.${index}.text`
const getOption = (question: string, option: string) =>   `questions.${question}.options.${option}`

const selectedQuestionId = ref<string|null>(null)
const selectedQuestion = computed(() => questions.value.find((q) => q.id == selectedQuestionId.value))
const selectedTarget = computed(() => selectedQuestion.value && selectedQuestion.value.target)
const optionPercent = (option: string) => selectedQuestion.value && selectedQuestion.value.options && selectedQuestion.value.options[option] || 0

const votesAreOpen = (question: string) => states.value.find((s) => s.question == question)
const openVotes = () => updateDoc(doc(db, 'states', selectedTarget.value), { question: selectedQuestionId.value})
const closeVotes = () => updateDoc(doc(db, 'states', selectedTarget.value), { question: 0 })
</script>
