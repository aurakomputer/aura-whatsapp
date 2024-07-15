<template lang="pug">
.container
    q-btn(color='primary', label='Tambah', @click='addUser')

    DataTable(ref='datatable', url='/users/all', :columns='columns')
        template(v-slot:action='{ props }')
            q-btn(round, dense, color='primary', flat, icon='mdi-pencil', @click='editUser(props.row)')
            q-btn(round, dense, color='secondary', flat, icon='mdi-book', :to='`/panel/users/${props.row.id}`')
</template>
<script setup>
import { ref } from 'vue'
import { Dialog } from 'quasar'
import DialogUser from '@/dialogs/UserForm.vue'

const datatable = ref()
function addUser() {
    Dialog.create({
        component: DialogUser,
    }).onOk(() => {
        datatable.value.refresh()
    })
}

function editUser(user) {
    console.log(user)
    Dialog.create({
        component: DialogUser,
        componentProps: {
            user: user,
            title: 'Ubah data pengguna',
        },
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
    {
        name: 'actions',
        label: '#',
        sortable: false,
    },
]

// addUser()
</script>
<route lang="yaml">
meta:
    layout: panel
</route>
