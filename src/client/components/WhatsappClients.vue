<template lang="pug">
q-card.no-shadow(bordered)
    q-card-section
        .text-h6 Daftar Whatsapp Client
    q-card-actions
        q-btn(icon="mdi-whatsapp" label="Tambah client" color="green" @click="addClient")
</template>
<script setup>
import { ref } from 'vue'
import { Dialog } from 'quasar'
import FormDialog from '../dialogs/ClientForm.vue'
const props = defineProps({
    user_id: {
        type: Number,
        required: true,
    },
})
function addClient() {
    Dialog.create({
        component: FormDialog,
        componentProps: {
            user_id: props.user_id,
        },
    }).onOk(() => {
        // getData
    })
}
</script>
