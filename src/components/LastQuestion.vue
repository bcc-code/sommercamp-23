<template>
    <div class="pt-24 pb-12 gap-y-8 overflow-y-scroll scrollbar-none">
		<h3 v-if="answered" class="text-center col-span-full mb-5 text-shadow px-6 uppercase font-bold text-3xl text-shadow-xl">{{ $t('thankyou') }}</h3>
		<template v-else>
			<h3 class="text-center col-span-full mb-5 text-shadow px-6 uppercase font-bold text-3xl text-shadow-xl">{{ $t(getQuestionKey(question)) }}</h3>
			<div class="flex items-center justify-center flex-col px-8">
				<input type="range" min="0" max="18" v-model="sliderValue"/>
				<p class="text-red text-4xl center"> {{sliderValue}} </p>
				<button @click="submitSocial" class="bg-[#af9152] mt-18 w-full text-beige">Send</button>
			</div>
		</template>
    </div>
</template>
<script setup lang="ts">
import { useSettings } from '@/composables/settings';
import axios from 'axios'
import { useOptions } from '@/composables/options';
import { defineProps, defineEmits } from 'vue';
const { settings, gender } = useSettings()
import { ref } from 'vue'

const question = '9a'
const sliderValue = ref(1)
const answered = ref(false)
const { getOptions, getQuestionKey, getOption } = useOptions()

function submitSocial() {
	if (!confirm('Are you sure?')) {
		return
	}
    axios.get(`https://counterp23.bcc.media/average/socials-${gender.value}/${sliderValue.value}`)
	answered.value = true
}

</script>
