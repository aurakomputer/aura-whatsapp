<template lang="pug">
q-btn(icon="mdi-plus" label="Tambah token" color='primary' push size="sm" @click="addToken")
q-list()
    q-item(v-for="token in tokens")
        q-item-section(avatar)
            q-icon(name="mdi-key-outline")
        q-item-section
            q-item-label {{ token.name }}
            q-item-label(caption) {{ moment(token.expiresAt).format('D MMM YYYY') }}
            q-item-label(v-if="$dev") {{ token.token }}

</template>
<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { Dialog } from 'quasar'
import moment from 'moment'

import DialogToken from '../dialogs/ClientTokenForm.vue'
import api from '../helpers/api.js'
const props = defineProps({
    client: Object,
    showButton: {
        default: true,
    },
})

const tokens = ref([])
async function getTokens() {
    const response = await api.get('/clients/' + props.client.id + '/tokens')
    tokens.value = response.tokens
}
getTokens()

function addToken() {
    Dialog.create({
        component: DialogToken,
        componentProps: {
            client: props.client,
        },
    }).onOk(() => {
        getTokens()
    })
}
</script>
