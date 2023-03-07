<template>
    <div class="pt-24 pb-12 grid grid-cols-2 gap-y-8 overflow-y-scroll scrollbar-none">
        <h3 class="text-center col-span-full mb-5 text-shadow px-6 uppercase font-bold text-3xl text-shadow-xl">{{ $t(getQuestionKey(question)) }}</h3>
        <button v-for="option in getOptions(question)" :key="'option-' + option"
                @click="emit('submit', option)" 
                class="h-40 bg-contain bg-transparent bg-no-repeat bg-center"
                :class="{
                    'cursor-default': answer,
                    'opacity-50 filter grayscale': answer && answer != option
                }"
                :style="{ backgroundImage: `url(/img/0a/${option}.webp)` }"></button>

    </div>
</template>
<script setup lang="ts">
import { useOptions } from '@/composables/options';
defineProps(['answer'])
const emit = defineEmits(['submit'])

const question = '0a'
const { getOptions, getQuestionKey, getOption } = useOptions()

</script>