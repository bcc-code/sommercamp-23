<template>
    <AdminLogin v-if="!adminUser" @submit="Login($event.username, $event.password)"/>
        <div v-else class="px-8 pt-16 pb-12 h-full flex flex-col justify-between">
    <div v-if="dataLoaded">
		<div v-for="(value, key) in fetchedData" :key="key" style="margin: 10px" class="rounded-md bg-taupe shadow text-center px-6 py-8">
        <strong>{{ key }}:</strong>
        <div v-for="(v, k) in value" :key="k">
          {{ k }}: {{ v }}%
        </div>
	  </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useQuestions } from '@/composables/questions';
import { useAdmin } from '@/composables/admin';
import { useState } from '@/composables/state';
import { onMounted } from 'vue';

const { adminUser, Login} = useAdmin()
const fetchedData = ref({});
const dataLoaded = ref(false);

const fetchData = async () => {
  // Replace the URL with the actual API endpoint where the JSON data is fetched from.
  const url = 'https://counterp23.bcc.media/showpercent';
  const response = await fetch(url);
  const data = await response.json();
  fetchedData.value = data;
  dataLoaded.value = true;
};

onMounted(() => {
  fetchData();
  setInterval(() => {
    fetchData();
  }, 1000);
});

</script>
