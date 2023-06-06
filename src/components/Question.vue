<template>
    <div class="flex flex-col space-y-5" v-if="question">
        <h2 class="text-3xl font-bold">{{ question.id }}. {{ question.nb }}</h2>
        <div class="grid grid-cols-4 gap-x-3 pb-8">
            <button v-for="(team, idx) in teams" :key="team" type="button"
                class="h-12 font-bold"
                @click="selectedAnswer = teamLeaders[idx]"
                :class="[`bg-${team}`, {
                    'glow': selectedAnswer && selectedAnswer == teamLeaders[idx],
                    'opacity-40': selectedAnswer && selectedAnswer != teamLeaders[idx]
                }]">
                {{ teamLeaders[idx] }}
            </button>
        </div>
        <TransitionGroup name="list" tag="div" class="flex flex-col space-y-3">
            <div v-for="(team, idx) in percents" :key="team.team" class="flex space-x-3 items-center">
                <img class="w-12 mt-1" :src="`/img/${idx + 1}.webp`">
                <p class="w-32 rounded" :class="`bg-${team.team}`">{{ teamName(team.team) }}</p>
                <div class="w-full flex gap-x-2 items-center">
                    <div class="w-full h-6 bg-white bg-opacity-10 rounded-full">
                        <div class="h-6 rounded-full bg-white" :style="{ width:  + team.percent + '%' }"></div>
                    </div>  
                    <span class="w-24 text-lg font-bold">{{ team.percent.toFixed(2)}}%</span>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>
<script setup lang="ts">
import { useAnswers } from '@/composables/answers'
import { useTeams } from '@/composables/teams'
import { computed, ref } from 'vue'

defineProps(["question", "column"])
const { answers } = useAnswers()
const { teams, teamName, teamLeaders } = useTeams()

const selectedAnswer = ref<string>()

const percents = computed(() => teams.map((t) => {
    let answersForOption = answers[t].value.reduce((acc: number, c: any) => {
        if (c.answer == selectedAnswer.value) return acc + 1
        else return acc
    }, 0)
    let totalAnswers = answers[t].value.length || 0
    return {
        team: t,
        percent: totalAnswers ? (100 * answersForOption) / totalAnswers : 0
    }
}).sort((a,b) => b.percent - a.percent))
</script>
<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
    position: absolute;
    bottom: 0;
    transform: translateY(30px);
    opacity: 0;
}
</style>