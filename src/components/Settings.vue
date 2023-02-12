<template>
    <main class="flex flex-col space-y-5 px-4 py-8">
        <div>
            <label for="language" class="block text-sm font-medium text-gray-700">{{$t('language')}}</label>
            <select v-model="locale" id="language" name="language" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option v-for="l in availableLocales" :key="'locale-' + l" :value="l" v-t="{ path: 'name', locale: l }"></option>
            </select>
        </div>
        <div>
            <label for="gender" class="block text-sm font-medium text-gray-700">{{$t('gender')}}</label>
            <select v-model="gender" id="gender" name="gender" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option v-for="g in genders" :key="g" :value="g">{{$t('genders.' + g) }}</option>
            </select>
        </div>
        <button type="button" @click="emit('submit', { gender, locale })" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">{{$t('login') }}</button>
    </main>
</template>
<script setup lang="ts">
import { ref, defineEmits} from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
    (e: 'submit', value: { gender: string, locale: string }): void
}>()
const { locale, availableLocales } = useI18n()

const genders = ['boy', 'girl'] as const;
type Gender = typeof genders[number]
const gender = ref<Gender>('boy')
</script>