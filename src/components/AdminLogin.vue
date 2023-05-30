<template>
    <main class="w-full max-w-lg mx-auto flex flex-col h-96 space-y-5 bg-granite border border-white/20 px-4 py-8 rounded-lg mt-24">
        <div>
            <label for="username">Username</label>
            <input v-model="username" id="username" name="username"  type="text">
        </div>
        <div>
            <label for="password">Password</label>
            <input v-model="password" id="password" name="password" type="password">
        </div>
        <button type="button" @click="emit('submit', { username, password })" class=" bg-red border border-transparent text-base font-medium text-white">Login</button>
    </main>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    (e: 'submit', value: { username: string, password: string }): void
}>()

const username = ref<string>("")
const password = ref<string>("")
</script>