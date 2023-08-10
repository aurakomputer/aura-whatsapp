<template lang="pug">
q-dialog(ref='dialogRef' @hide='onDialogHide')
    q-card.q-dialog-plugin
        q-card-section
            div.text-h5 Scan QRCode WhatsApp Client

            .q-mt-md.flex.justify-center(v-if="qrCode")
                img(:src="qrCode")

        q-card-actions(align='right')
            q-btn(color='positive' icon="mdi-qrcode" label='Minta QRCode' @click='requestQr')
            q-btn(color='primary' label='Cancel' @click='onDialogCancel')

        .text-right(v-if="$dev") {{ client }}
</template>

<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import api from '../helpers/api.js'
const props = defineProps({
    client: Object,
})

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
function onOKClick() {
    onDialogOK()
}

const qrCode = ref(null)

async function requestQr() {
    api.delete(`/sessions/delete/${props.client.id}`)

    const response = await api.post('/sessions/add', {
        id: props.client.id,
    })

    qrCode.value = response.data.qr
    console.log(response)
}
</script>
