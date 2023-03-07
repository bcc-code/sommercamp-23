import { useLocalStorage } from "@vueuse/core"
import { useFirestore } from "@vueuse/firebase"
import { computed } from "vue"
import { getFirestore, doc } from "firebase/firestore"

export const useState = () => {
    const db = getFirestore()
    const settings = useLocalStorage('pc23-options', {}) as any
    const stateRef = computed(() => settings.value && settings.value!.gender && doc(db, 'states', settings.value!.gender))
    const state = useFirestore(stateRef, null)
    const isFirstQuestion = computed(() => state.value && state.value.question == '0a')
    const hasQuestion = computed(() => state.value && state.value.question && state.value.question != '0')
    return {settings, stateRef, state, isFirstQuestion, hasQuestion}
}