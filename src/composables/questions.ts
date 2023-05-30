import { collection, doc, getFirestore } from "firebase/firestore"
import { useAuth, useFirestore } from "@vueuse/firebase"
import { computed } from "vue"
import { getAuth } from "firebase/auth"

interface Question {
    nb: string
    en: string
}
export const useQuestions = () => {
    const db = getFirestore()
    const { isAuthenticated } = useAuth(getAuth())
    const reference = computed(() => isAuthenticated.value && collection(db, 'questions') || null)
    const document = (questionId: string) => reference.value && doc(reference.value, questionId)
    const list = useFirestore(reference, [])
    
    const getById = (questionId: string) : Question | null => list.value.find((q) => q.id == questionId) as Question || null
    const isPause = (questionId: string) => questionId.startsWith('p')
    
    return {
        ref: reference,
        doc: document,
        list,
        getById,
        isPause,
    }
}