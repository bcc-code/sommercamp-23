<template>
    <AdminLogin v-if="!adminUser" @submit="Login($event.username, $event.password)"/>
    <template v-else>
        Welcome {{ user?.displayName }}
        <div class="grid grid-cols-4 gap-x-5 px-8">
            <div class="overflow-hidden rounded-md bg-white shadow">
                <ul role="list" class="divide-y divide-gray-200">
                    <li class="px-6 py-4 cursor-pointer" v-for="question in questions" :key="'question-' + question" @click="selectedQuestionId = question.id"
                        :class="selectedQuestionId == question.id ? 'bg-slate-500 text-white' : 'hover:bg-slate-100'">
                        {{ $t(getQuestion(question.id)) }}
                    </li>
                </ul>
            </div>
            <div class="col-span-3 h-full rounded-md bg-white shadow text-center p-12">
                <template v-if="selectedQuestionId && selectedQuestion">
                    <h2 class="text-xl  font-bold mb-12">
                        {{ $t(getQuestion(selectedQuestionId)) }} &nbsp;
                        <span v-if="selectedTarget == 'girl'" class="inline-flex items-center rounded-full bg-pink-100 px-3 py-0.5 text-sm font-medium text-pink-800">Girls</span>
                        <span v-if="selectedTarget == 'boy'" class="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">Boys</span>
                    </h2>
                    <div class="flex flex-col space-y-5">
                        <div v-for="idx in ['1','2']" :index="'option-'+idx" class="flex items-center gap-x-2">
                            <p class="text-sm w-24">{{ $t(getOption(selectedQuestionId, idx)) }}</p>
                            <div class="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div class="h-4 bg-blue-600 rounded-full dark:bg-blue-500" :style="{ width:  + optionPercent(idx) + '%' }"></div>
                            </div>  
                            <span class="font-bold">{{ optionPercent(idx) }}%</span>
                        </div>
                    </div>
                    <div class="mt-5 grid grid-cols-2 gap-x-5">
                        <button @click="openVotes" class="py-5 bg-blue-500 text-white rounded" :class="{ 'opacity-50' : votesAreOpen(selectedQuestionId) }">{{ $t('openVotes') }}</button>
                        <button @click="closeVotes" class="py-5 bg-red-500 text-white rounded" :class="{ 'opacity-50' : !votesAreOpen(selectedQuestionId) }">{{ $t('closeVotes') }}</button>
                    </div>
                </template>
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
