<template>
    <h2 class="text-4xl mb-12 row-start-1" :class="{ 'col-start-1': column == 0, 'col-start-2': column == 1 }">
        {{ $t(getQuestionKey(question.id)) }} &nbsp;
        <span v-if="target == Targets.Girls" class="inline-flex align-middle rounded-full bg-pink-100 px-3 py-0.5 text-base font-medium text-pink-800">Girls</span>
        <span v-if="target == Targets.Boys" class="inline-flex align-middle rounded-full bg-blue-100 px-3 py-0.5 text-base font-medium text-blue-800">Boys</span>
        <span v-if="target == Targets.All" class="inline-flex align-middle rounded-full bg-green-100 px-3 py-0.5 text-base font-medium text-green-800">All</span>
    </h2>
    <div class="flex flex-col space-y-5 row-start-2" :class="{ 'col-start-1': column == 0, 'col-start-2': column == 1 }">
        <div v-for="idx in getOptions(question.id)" :index="'option-'+idx" :class="getOptions(question.id).length > 2 ? 'grid grid-cols-2' : 'flex flex-col gap-y-2'">
            <p>{{ $t(getOption(question.id, idx)) }}</p>
            <div class="w-full flex gap-x-2 items-center">
                <div class="w-full h-4 bg-beige bg-opacity-10 rounded-full">
                    <div class="h-4 rounded-full bg-orange" :style="{ width:  + optionPercent(question, idx) + '%' }"></div>
                </div>  
                <span class="text-lg font-bold">{{ optionPercent(question, idx).toFixed(2)}}%</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useOptions } from '@/composables/options';
import { computed } from 'vue'

const props = defineProps(["question", "column"])

const { getOption, getOptions, optionPercent, getQuestionKey } = useOptions()

enum Targets {
    Boys = 'b',
    Girls = 'g',
    All = 'a'
}

const target = computed(() => props.question && props.question.id.slice(-1))
</script>