<template lang="pug">
NoItems(v-if='!client', :loading='loading.client')
.row.q-col-gutter-lg(v-else)
    .col-12.col-sm-6.col-md-4
        q-card.no-shadow(bordered)
            q-card-section
                .text-h6 Detail Whatsapp Client
            q-card-section.q-pt-none
                ClientCard(:client='client', flat, :showButton='false')
            q-card-section.q-pt-none
                .text-grey {{ client.id }}
            q-card-section(v-if='client.locked')
                .flex.align-center
                    q-icon(name='mdi-lock')
                    .text-bold Sesi dikunci

    .col-12.col-sm-6.col-md-4
        .q-gutter-md
            q-btn-group(v-if='!client.locked')
                q-btn(
                    label='Konek / Scan QR',
                    icon='mdi-qrcode',
                    color='green',
                    @click='scanQr',
                    :loading='loading.button'
                )
                q-btn(label='Logout', icon='mdi-logout', color='red', @click='logout', :loading='loading.button')
            q-btn-group
                q-btn(
                    :label='!client.locked ? "lock" : "unlock"',
                    :icon='!client.locked ? "mdi-lock" : "mdi-lock-open"',
                    color='primary',
                    @click='toogleLock',
                    :loading='loading.button'
                )

        q-separator(spaced)
        .row
            .col(v-for='button in buttons')
                q-btn(
                    push,
                    :label='button.label',
                    :color='button.color',
                    :icon='button.icon',
                    @click='button.click',
                    size='md'
                )
    .col-12.col-sm-6
        q-card
            q-card-section
                .text-h6 Mengunakan rest untuk kirim data
            q-separator
            .q-pa-sm
                ClientTokens(:client='client')
</template>
<script setup>
import ClientCard from '@/components/ClientCard.vue'
import ClientTokens from '@/components/ClientTokens.vue'

import DialogQr from '@/dialogs/ClientQr.vue'
import DialogSendMessage from '@/dialogs/SendMessage.vue'
import { Dialog } from 'quasar'

const route = useRoute()
const client = ref(null)
const loading = ref({
    client: false,
    button: false,
})

async function getClient() {
    loading.value.client = true
    const response = await api.get('/clients/' + route.params.id)
    client.value = response.client
    loading.value.client = false
}

async function toogleLock() {
    loading.value.button = true
    await api.post('/clients/' + route.params.id + '/toggle-locked')
    await getClient()
    loading.value.button = false
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

function logout() {
    Dialog.create({
        title: 'Yakin akan menghapus sesi login untuk client ini ?',
        cancel: true,
    }).onOk(() => {
        api.delete(`/sessions/delete/${client.value.id}`)
    })
}

function sendMessage() {
    Dialog.create({
        component: DialogSendMessage,
        componentProps: {
            client: client.value,
        },
    }).onOk(() => {
        datatable.value.refresh()
    })
}

const buttons = [
    {
        label: 'Kirim Pesan',
        click: sendMessage,
        icon: 'mdi-whatsapp',
        color: 'green',
    },
]
</script>

<route lang="yaml">
meta:
    layout: panel
</route>
