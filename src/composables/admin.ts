import { useAuth } from "@vueuse/firebase"
import { computed } from "vue"
import { useFirestore } from "@vueuse/firebase"
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, doc } from "firebase/firestore"

export const useAdmin = () => {
    const auth = getAuth()
    const db = getFirestore()

    const { user } = useAuth(auth)
    const adminUserQuery = computed(() => user.value && user.value.email && doc(db, 'admins', user.value.email))
    const adminUser = useFirestore(adminUserQuery, null)

    const Login = (username: string, password: string) => {
        setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithEmailAndPassword(auth, username, password)
            .catch(() => {
                //TODO: Show invalid credentials message
                console.log('Invalid username or password')
            })
        })
    }

    return { adminUser, Login }
}