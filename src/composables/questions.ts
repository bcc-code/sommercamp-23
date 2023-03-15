import { collection, getFirestore } from "firebase/firestore"
import { useFirestore } from "@vueuse/firebase"

export const useQuestions = () => {
    const db = getFirestore()
    const questions = useFirestore(collection(db, 'questions'), [])
    const getQuestionById = (questionId: string) => questions.value.find((q) => q.id == questionId) || { id: questionId }
    const isPause = (questionId: string) => questionId.startsWith('p')
    return {
        questions,
        getQuestionById,
        isPause
    }
}