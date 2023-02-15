<template>
    <h2 class="text-4xl mb-12 row-start-1" :class="{ 'col-start-1': column == 0, 'col-start-2': column == 1 }">
        {{ $t(textKey) }} &nbsp;
        <span v-if="target == Targets.Girls" class="inline-flex align-middle rounded-full bg-pink-100 px-3 py-0.5 text-base font-medium text-pink-800">Girls</span>
        <span v-if="target == Targets.Boys" class="inline-flex align-middle rounded-full bg-blue-100 px-3 py-0.5 text-base font-medium text-blue-800">Boys</span>
    </h2>
    <div class="flex flex-col space-y-5 row-start-2" :class="{ 'col-start-1': column == 0, 'col-start-2': column == 1 }">
        <div v-for="idx in ['1','2']" :index="'option-'+idx" class="flex flex-col gap-y-2">
            <p>{{ $t(getOption(question.id, idx)) }}</p>
            <div class="w-full flex gap-x-2 items-center">
                <div class="w-full h-4 bg-beige bg-opacity-10 rounded-full">
                    <div class="h-4 rounded-full" :class="['bg-dark-yellow', 'bg-orange'][Number(idx)-1]" :style="{ width:  + optionPercent(idx) + '%' }"></div>
                </div>  
                <span class="text-lg font-bold">{{ optionPercent(idx) }}%</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(["question", "column"])
const textKey = computed(() => `questions.${props.question.id}.text`)
const getOption = (question: string, option: string) =>   `questions.${question}.options.${option}`

enum Targets {
    Boys = 'b',
    Girls = 'g'
}

const target = computed(() => props.question && props.question.id.slice(-1))
const optionPercent = (option: string) => props.question && props.question.options && props.question.options[option] || 0

</script>