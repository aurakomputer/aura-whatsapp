<template lang="pug">
q-form(@submit="submit")
    q-dialog(ref='dialogRef' @hide='onDialogHide')
        q-card.q-dialog-plugin
            q-card-section
                div.text-h5 Kirim Pesan

                q-input(v-model="form.receiver" label="No. Tujuan")
                q-input(type="textarea" v-model="form.message" rows="2" label="Pesan yang dikirim")


                q-list.q-ml-md.q-my-md(separator bordered)
                    q-item(v-for="(file, index) in form.files")
                        q-item-section()
                            q-item-label {{ file.name }}
                            q-item-label(caption) {{ file.type }}
                        q-item-section(side)
                            q-btn(icon="mdi-trash-can-outline" round size="xs" outline color="red" @click="form.files.splice(index, 1)")

                q-file(label="Kirim File" @update:model-value="pickFiles" multiple)

            q-card-actions(align='right')
                q-btn(color='primary' flat label='Cancel' @click='onDialogCancel')
                q-btn(color='primary' type="submit" push label='Kirim' :loading="loading.submit")

</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

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
function pickFiles(files) {
    for (const file of files) {
        form.value.files.push(file)
    }
}
async function submit() {
    loading.value.submit = true
    try {
        const formData = new FormData()
        formData.append('receiver', form.value.receiver)
        formData.append('message', form.value.message)

        for (const file of form.value.files) {
            formData.append('files', file)
        }
        const response = await api.post('/chats/send', formData, {
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
