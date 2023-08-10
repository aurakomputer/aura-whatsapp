<template lang="pug">
NoItems(v-if="!client" :loading="loading.client")
.row.q-col-gutter-lg(v-else)
    .col-12.col-sm-6.col-md-4
        q-card.no-shadow(bordered)
            q-card-section
                .text-h6 Detail Whatsapp Client
            q-card-section.q-pt-none
                ClientCard(:client="client" flat :showButton="false")

    .col-12.col-sm-6.col-md-4
        .q-gutter-md
            q-btn-group
                q-btn(label="Konek / Scan QR" icon="mdi-qrcode" color="green" @click="scanQr")
                q-btn(label="Logout" icon="mdi-logout" color="red" )
            q-btn-group
                q-btn(label="Tambah Quota" icon="mdi-plus" color="primary" )
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '../helpers/api.js'

import ClientCard from '../components/ClientCard.vue'
import DialogQr from '../dialogs/ClientQr.vue'
import { Dialog } from 'quasar'

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

    // scanQr()
}

getClient()

function scanQr() {
    Dialog.create({
        component: DialogQr,
        componentProps: {
            client: client.value,
        },
    }).onOk(() => {
        datatable.value.refresh()
    })
}
</script>
