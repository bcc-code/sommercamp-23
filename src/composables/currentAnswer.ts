import { useAuth, useFirestore } from "@vueuse/firebase"
import { getAuth } from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { computed } from "vue"
import { useState } from "./state"
import { useSettings } from "./settings"

export const useCurrentAnswer = () => {
    const db = getFirestore()
    const { user } = useAuth(getAuth())
    const { team } = useSettings()
    const { question } = useState()
    const reference = computed(() => user.value && question.value && team.value && doc(db, 'questions', question.value, 'teams', team.value, 'answers', user.value.uid ))

    const currentAnswer = useFirestore(reference, null)
    const submitAnswer = (answer: string) => {
        if (!reference.value) return
        setDoc(reference.value, { answer })
    }

    return {
        currentAnswer,
        submitAnswer
    }

}