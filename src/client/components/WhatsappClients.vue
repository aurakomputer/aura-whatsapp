<template lang="pug">
q-card.no-shadow(bordered)
    q-card-section
        .text-h6 Daftar Whatsapp Client
    q-card-actions
        q-btn(icon='mdi-whatsapp', label='Tambah client', color='green', @click='addClient')

    q-list
        ClientCard(v-for='client in clients', :client='client', flat)

    .text-right(v-if='$dev') {{ username }}
</template>
<script setup>
import ClientFormDialog from '@/dialogs/ClientFormDialog.vue'
import { Dialog } from 'quasar'

const clients = ref([])
const props = defineProps({
    username: {
        type: String,
        required: true,
    },
})
function addClient() {
    Dialog.create({
        component: ClientFormDialog,
        componentProps: {
            username: props.username,
        },
    }).onOk(() => {
        getClients()
        // getData
    })
}

async function getClients(params) {
    const response = await api.get('/clients/all', {
        params: {
            username: props.username,
        },
    })

    clients.value = response.rows
}

getClients()
</script>
