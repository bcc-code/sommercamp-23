import { useFirestore } from "@vueuse/firebase"
import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { computed } from "vue"

export const useState = () => {
    const db = getFirestore()
    const sequence = ['p0', 'q1', 'p1', 'q2', 'p2', 'q3', 'p3']

    const ref = computed(() => doc(db, 'state', 'state'))
    const data = useFirestore(ref)
    const question = computed(() => data.value && String(data.value.question) || '')

    const updateState = (questionId: string) => {
        console.log(questionId)
        updateDoc(ref.value, { question: questionId })
    }
    return {
        data,
        sequence,
        question,
        updateState
    }
}