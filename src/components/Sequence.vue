<template>
    <nav aria-label="Progress">
        <ol role="list" class="flex items-center">
            <li class="relative pr-4 sm:pr-8" v-for="(item, idx) in items" :key="item">
                <div v-if="idx < (items.length - 1)" class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="h-1 w-full bg-dark-yellow"></div>
                </div>
                <div class="relative flex h-12 w-12 items-center justify-center rounded-full transition-colors border-4 border-dark-yellow"
                    :class="currentStep == idx ? 'bg-yellow text-dark-brown' : currentStep >= idx ? 'bg-dark-yellow text-beige' : 'rounded-full bg-beige text-taupe'">
                    <span class="font-bold">{{ item.every(isPause) ? 'P' : item.filter((q: string) => !isPause(q)).join(',') }}</span>
                </div>
            </li>
        </ol>
    </nav>
</template>
<script setup lang="ts">
import { useQuestions } from '@/composables/questions';
defineProps(["items", "currentStep"])
const { isPause } = useQuestions()
</script>