<template lang="pug">
NoItems(v-if="!client" :loading="loading.client")
.row.q-col-gutter-lg(v-else)
    .col-12.col-sm-6.col-md-4
        q-card.no-shadow(bordered)
            q-card-section
                .text-h6 Detail Whatsapp Client
            q-card-section.q-pt-none
                .text-subtitle1
                    | {{ client.name }}
                .text-caption.text-grey
                    | {{ client.email }}

    .col-12.col-sm-6.col-md-4
        | {{ client }}
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '../helpers/api.js'

const route = useRoute()
const client = ref(null)
const loading = ref({
    client: false,
})

async function getClient() {
    loading.value.client = true
    const response = await api.get('/clients/' + route.params.id)
    client.value = response.client
    loading.value.client = false
}

getClient()
</script>
