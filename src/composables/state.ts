import { useFirestore } from "@vueuse/firebase"
import { computed } from "vue"
import { getFirestore, doc, collection } from "firebase/firestore"
import { useSettings } from './settings'
import { useQuestions } from "./questions"

export const useState = (forceGender?: string) => {
    const db = getFirestore()
    const { isPause } = useQuestions()
    const { gender } = useSettings()

    const states = useFirestore(collection(db, 'states'), []) 

    const stateRef = computed(() => forceGender ? doc(db, 'states', forceGender) : gender.value && doc(db, 'states', gender.value))
    const state = useFirestore(stateRef, null)

    const isFirstQuestion = computed(() => state.value && state.value.question == '0a')
    const hasQuestion = computed(() => state.value && state.value.question && !isPause(state.value.question))
    
    return { states, state, isFirstQuestion, hasQuestion }
}