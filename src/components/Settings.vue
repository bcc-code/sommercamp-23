<template>
    <div class="mx-12 ">
        <img class="w-40 mx-auto pt-12 mb-12" src="/img/logo.webp">
        <div class="flex flex-col space-y-5 px-4 py-8 rounded-lg mb-12 ">
            <div>
                <label for="language">{{$t('language')}}</label>
                <select v-model="locale" id="language" name="language">
                    <option v-for="l in availableLocales" :key="'locale-' + l" :value="l" v-t="{ path: 'name', locale: l }"></option>
                </select>
            </div>
            <div>
                <label for="gender">{{$t('gender')}}</label>
                <select v-model="gender" id="gender" name="gender">
                    <option v-for="g in genders" :key="g" :value="g">{{$t('genders.' + g) }}</option>
                </select>
            </div>
        </div>  
        <div class="w-full text-center">
            <button type="button" @click="emit('submit', { gender, locale })" class="bg-yellow text-taupe text-base font-semibold">{{$t('login') }}</button>
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { ref} from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
    (e: 'submit', value: { gender: string, locale: string }): void
}>()
const { locale, availableLocales } = useI18n()

const genders = ['boy', 'girl'] as const;
type Gender = typeof genders[number]
const gender = ref<Gender>('boy')
</script>