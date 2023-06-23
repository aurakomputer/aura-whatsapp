<template lang="pug">
.container
    q-btn(color="primary" label="Tambah" @click="addUser")

    DataTable(ref="datatable" url="/users/all" :columns="columns")
</template>
<script setup>
import { ref } from 'vue'
import { Dialog } from 'quasar'
import DialogUser from '../dialogs/UserForm.vue'

const datatable = ref()
function addUser() {
    Dialog.create({
        component: DialogUser,
    }).onOk(() => {
        datatable.value.refresh()
    })
}

const columns = [
    {
        name: 'name',
        label: 'Nama',
        field: 'name',
        align: 'left',
        sortable: true,
    },

    {
        name: 'email',
        label: 'Email',
        field: 'email',
        align: 'left',
        sortable: true,
    },
]

// addUser()
</script>
