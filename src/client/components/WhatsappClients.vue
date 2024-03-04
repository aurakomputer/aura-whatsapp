<template lang="pug">
q-card.no-shadow(bordered)
    q-card-section
        .text-h6 Daftar Whatsapp Client
    q-card-actions
        q-btn(icon="mdi-whatsapp" label="Tambah client" color="green" @click="addClient")

    q-list()
        ClientCard(v-for='client in clients' :client="client" flat)

    .text-right(v-if="$dev") {{ userId }}
</template>
<script setup>
import { ref } from 'vue'
import { Dialog } from 'quasar'
import FormDialog from '../dialogs/ClientForm.vue'
import ClientCard from '../components/ClientCard.vue'
import api from '../helpers/api.js'

const clients = ref([])
const props = defineProps({
    userId: {
        type: String,
        required: true,
    },
})
function addClient() {
    Dialog.create({
        component: FormDialog,
        componentProps: {
            userId: props.userId,
        },
    }).onOk(() => {
        getClients()
        // getData
    })
}

async function getClients(params) {
    const response = await api.get('/clients/all', {
        params: {
            userId: props.userId,
        },
    })

    clients.value = response.rows
}

getClients()
</script>
