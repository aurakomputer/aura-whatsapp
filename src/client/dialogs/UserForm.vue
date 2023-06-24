<template lang="pug">
q-form(@submit="submit")
    q-dialog(ref='dialogRef' @hide='onDialogHide')
        q-card.q-dialog-plugin
            q-card-section
                div.text-h5 {{ title}}
                q-input(label="Nama" v-model="form.name" :rules='[$rules.required()]')
                q-input(label="Email" v-model="form.email" :rules='[$rules.required()]' type="email")
                q-input(label="Password" v-model="form.password" :rules='form.id ? [] : [$rules.required()]' note='(*) Kosongkan untuk default')

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
        default: 'Tambah User',
    },
    user: Object,
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
        const response = await api.post('/users/action', form.value)

        // toast.request(response.status, response.message)
        if (response.success) {
            onDialogOK()
        }
    } finally {
        loading.value.submit = false
    }
}
</script>
