import { useAuth, useFirestore } from "@vueuse/firebase"
import { getAuth } from "firebase/auth"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { computed } from "vue"
import type { Team } from "./teams"

interface Settings {
    team?: Team 
}

export const useSettings = () => {
    const db = getFirestore()
    const auth = getAuth()
    const { user } = useAuth(auth)

    const userRef = computed(() => user.value && user.value.uid && doc(db, "users", user.value.uid))
    const settings = useFirestore<Settings>(userRef, undefined)
    const team = computed(() => settings.value && settings.value.team)

    const updateSettings = (settings: any) => {
        if (userRef.value) setDoc(userRef.value, settings)
    }

    return { settings, updateSettings, team }
}
