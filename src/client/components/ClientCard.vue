<template lang="pug">
q-card()
    q-item
        q-item-section(avatar)
            q-icon(name="mdi-whatsapp" :color="connected ? 'positive': 'negative'")
        q-item-section
            q-item-label() {{ client.name }}
            q-item-label(caption) {{ client.phoneNumber }}
        q-item-section(side v-if="showButton")
            q-btn(icon="mdi-book-search-outline" color="primary" round dense size='sm' :to="{name: 'clients.detail', params: {id: client.id}}")

</template>
<script setup>
import { ref } from 'vue'
import api from '../helpers/api.js'
const props = defineProps({
    client: Object,
    showButton: {
        default: true,
    },
})

const connected = ref(false)

async function getSessionStatus() {
    const response = await api.get('/sessions/status/' + props.client.id)

    connected.value = response.success
    console.log(response)
}

getSessionStatus()
</script>
