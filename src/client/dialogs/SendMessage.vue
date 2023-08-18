<template lang="pug">
q-form(@submit="submit")
    q-dialog(ref='dialogRef' @hide='onDialogHide')
        q-card.q-dialog-plugin
            q-card-section
                div.text-h5 Kirim Pesan

                q-input(v-model="form.receiver" label="No. Tujuan")
                q-input(type="textarea" v-model="form.message" rows="2" label="Pesan yang dikirim")


                q-list.q-ml-md.q-my-md(separator bordered)
                    q-item(v-for="file in form.files")
                        q-item-section()
                            q-item-label {{ file.name }}
                            q-item-label(caption) {{ file.type }}
                        q-item-section(side)
                            q-btn(icon="mdi-trash-can-outline" round size="xs" outline color="red")

                q-file(label="Kirim File" @update:model-value="pickFile")

            q-card-actions(align='right')
                q-btn(color='primary' flat label='Cancel' @click='onDialogCancel')
                q-btn(color='primary' type="submit" push label='Kirim' :loading="loading.submit")

</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
import jsonToFormData from '@ajoelp/json-to-formdata'

import api from '../helpers/api.js'

const props = defineProps({
    client: {
        required: true,
        type: Object,
    },
})

const dev = import.meta.env.DEV
const form = ref({
    receiver: dev ? '085161748582' : null,
    message: dev ? 'lorem' : '',
    files: [],
})

const loading = ref({
    submit: false,
})

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
function onOKClick() {
    onDialogOK()
}
function pickFile(e) {
    console.log(e)
    form.value.files.push(e)
}
async function submit() {
    loading.value.submit = true
    try {
        const response = await api.post('/chats/send', jsonToFormData(form.value), {
            params: {
                id: props.client.id,
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        // toast.request(response.status, response.message)
        if (response.status) {
            // ;
        }
    } finally {
        loading.value.submit = false
    }
}
</script>
