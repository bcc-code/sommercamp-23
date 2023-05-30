<template>
    <AdminLogin v-if="!adminUser" @submit="Login($event.username, $event.password)"/>
    <template v-else>
        <div class="px-8 pt-16 pb-12 h-full flex flex-col justify-between">
            <div class="rounded-md bg-granite shadow text-center px-12 py-8">
                <template v-if="!currentStep || isPause(currentStep)">
                    <h2 class="text-4xl">Pause</h2>
                </template>
                <Question v-else :question="getById(currentStep)" />
            </div>
            <div class="flex flex-col space-y-8">
               <Sequence class="mx-auto" :items="state.sequence" :currentStep="currentStepIndex"/>
                <div class="md:w-1/2 md:mx-auto grid grid-cols-2 gap-x-5 h-16">
                    <button :class="{ 'opacity-50 cursor-default' : !canGoPrevious }" class="bg-red font-bold" @click="previous">Previous</button>
                    <button :class="{ 'opacity-50 cursor-default' : !canGoNext }" class="bg-green font-bold" @click="next">Next</button>
                </div>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'
import { useQuestions } from '@/composables/questions'
import { useAdmin } from '@/composables/admin'
import { useState } from '@/composables/state'

const { adminUser, Login} = useAdmin()
const questions = useQuestions()
const { getById, isPause } = questions

const state = useState()

const currentStepIndex = ref<number>(0)
const currentStep = computed(() => state.sequence[currentStepIndex.value])

const canGoPrevious = computed(() => currentStepIndex.value > 0)
const previous = () => { if (canGoPrevious.value) state.updateState(state.sequence[currentStepIndex.value - 1])}

const canGoNext = computed(() => currentStepIndex.value < state.sequence.length - 1)
const next = () => { if (canGoNext.value) state.updateState(state.sequence[currentStepIndex.value + 1]) }

watch(() => state.data.value, () => currentStepIndex.value = state.data.value && state.sequence.indexOf(state.data.value.question) || 0)
</script>
