<template lang="pug">
q-form(@submit="submit")
    q-dialog(ref='dialogRef' @hide='onDialogHide')
        q-card.q-dialog-plugin
            q-card-section
                div.text-h5
                    q-icon.q-mr-md(name="mdi-whatsapp")
                    span {{ title}}

                q-input(label="Nama" v-model="form.name" :rules='[$rules.required()]' hint="Masukan nama untuk client, contoh: HP Pribadi")
                q-input(label="No. HP" v-model="form.phone_number" :rules='[$rules.required()]' hint="Masukan no. hp / wa yang akan di koneksikan")
                q-input(label="URL Webhook" v-model="form.domain" type="url" hint="(opsional) digunakan untuk mengirim data pesan ke alamat url tujuan")

            q-card-actions(align='right')
                q-btn(color='primary' label='Submit' type='Submit')
                q-btn(flat label='Cancel' @click='onDialogCancel')
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
import api from '../helpers/api.js'
const props = defineProps({
    title: {
        default: 'Tambah Whatsapp Client',
    },
    client: Object,
    user_id: String,
})

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
function onOKClick() {
    onDialogOK()
}

const loading = ref({
    submit: false,
})
const form = ref(props.user ?? {})

async function submit() {
    loading.value.submit = true
    try {
        const response = await api.post('/clients/action', {
            ...form.value,
            user_id: props.user_id,
        })

        // toast.request(response.status, response.message)
        if (response.success) {
            onDialogOK()
        }
    } finally {
        loading.value.submit = false
    }
}
</script>
