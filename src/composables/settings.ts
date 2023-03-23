import { useLocalStorage } from "@vueuse/core"
import { computed } from "vue"

interface Settings {
    language?: string
    gender?: string
}

export const useSettings = () => {
    const settings = useLocalStorage<Settings>('pc23-options', {})
    const gender = computed(() => settings.value && settings.value!.gender)
    return { settings, gender }
}
