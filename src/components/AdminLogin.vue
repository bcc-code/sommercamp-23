<template>
    <main class="w-full max-w-lg mx-auto flex flex-col space-y-5 bg-slate-300 px-4 py-8 rounded-lg mt-24">
        <div>
            <label for="username" class="block text-sm font-medium text-gray-700">{{$t('username')}}</label>
            <input v-model="username" id="username" name="username"  type="text" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
        </div>
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700">{{$t('password')}}</label>
            <input v-model="password" id="password" name="password" type="password" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
        </div>
        <button type="button" @click="emit('submit', { username, password })" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">{{$t('login') }}</button>
    </main>
</template>
<script setup lang="ts">
import { ref, defineEmits} from 'vue'

const emit = defineEmits<{
    (e: 'submit', value: { username: string, password: string }): void
}>()

const username = ref<string>("")
const password = ref<string>("")
</script>