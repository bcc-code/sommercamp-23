import { useAuth, useFirestore } from "@vueuse/firebase"
import { getAuth } from "firebase/auth"
import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { computed } from "vue"

export const useState = () => {
    const db = getFirestore()
    const sequence = ['p0', 'q1', 'p1', 'q2', 'p2', 'q3', 'p3']
    const { isAuthenticated } = useAuth(getAuth())
    const ref = computed(() => isAuthenticated.value ? doc(db, 'state', 'state') : null)
    const data = useFirestore(ref)
    const question = computed(() => data.value && String(data.value.question) || '')
    const questionIdForAdmin = computed(() => question.value && 'q' + question.value.slice(-1))

    const updateState = (questionId: string) => updateDoc(ref.value!, { question: questionId })
    return {
        data,
        sequence,
        question,
        updateState,
        questionIdForAdmin
    }
}