<template>
    <div class="flex flex-col justify-between space-y-12 px-4 py-8 rounded-lg text-center">
        <div class="flex flex-col gap-y-2">
            <h1 class="text-3xl font-bold">Velg lag</h1>
            <div class="w-16 mx-auto h-1 bg-white"></div>
            <h1 class="text-xl font-light">Choose team</h1>
        </div>
        <div class="flex flex-col">
            <p class="text-lg font-bold">I hvilken sone sitter du?</p>
            <p class="text-sm font-light">In what zone are you sitting?</p>
        </div>
        <div class="grid grid-cols-2 gap-2 w-64 mx-auto">
            <button v-for="team in teams"
                @click="selectedTeam = (selectedTeam == team) ? undefined : team"
                class="rounded h-20 transition-opacity font-bold"
                :class="[`bg-${team}`, {
                    'glow': selectedTeam == team,
                    'opacity-25': selectedTeam && selectedTeam != team
                }]">
                {{ teamName(team) }}
            </button>
        </div>
        <div class="w-full text-center">
            <button type="button" :disabled="!selectedTeam"
                @click="emit('submit', { team: selectedTeam! })"
                :class="{ 'opacity-50': !selectedTeam }"
                class="bg-red text-white transition-opacity">
                Bekreft/Confirm
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref} from 'vue'
import { useTeams, type Team } from '@/composables/teams'

const emit = defineEmits<{
    (e: 'submit', value: { team: Team }): void
}>()
const { teams, teamName } = useTeams()
const selectedTeam = ref<Team>()
</script>
