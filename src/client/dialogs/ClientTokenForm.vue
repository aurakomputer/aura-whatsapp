<template lang="pug">
q-form(@submit='submit')
    q-dialog(ref='dialogRef', @hide='onDialogHide')
        q-card.q-dialog-plugin
            q-card-section
                .text-h5
                    q-icon.q-mr-md(name='mdi-key')
                    span {{ title }}
                .text-caption Akses token digunakan untuk dapat mengakses client whatsapp melalui API

                q-input(
                    label='Judul Akses',
                    v-model='form.name',
                    :rules='[$rules.required()]',
                    hint='contoh: Token Pribadi'
                )
                DateTimePicker(
                    label='Tgl. Kadaluarsa',
                    v-model='form.expiresAt',
                    :rules='[$rules.required("tolong diisi")]'
                )

            q-card-actions(align='right')
                q-btn(color='primary', label='Submit', type='Submit')
                q-btn(flat, label='Cancel', @click='onDialogCancel')

            .text-right(v-if='$dev') {{ username }}
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
import api from '../helpers/api.js'
import DateTimePicker from '../components/DateTimePicker.vue'

const props = defineProps({
    title: {
        default: 'Tambah Akses Token',
    },
    client: Object,
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
        const response = await api.post(`/clients/${props.client.id}/tokens/create`, {
            ...form.value,
            clientId: props.client.id,
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
