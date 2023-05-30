import { useFirestore } from "@vueuse/firebase"
import { getFirestore, collection } from "firebase/firestore"
import { computed } from "vue"
import { useState } from "./state"
import { useTeams, type Team } from "./teams"

export const useAnswers = () => {
    const db = getFirestore()

    const { question } = useState()
    const { teams } = useTeams()

    const references = {} as any
    const answers = {} as any
    teams.forEach((t) => {
        references[t] = computed(() =>question.value && collection(db, 'questions', question.value, 'teams', t, 'answers'))
        answers[t] = useFirestore(references[t], [])
    })

    return {
        answers
    }

}