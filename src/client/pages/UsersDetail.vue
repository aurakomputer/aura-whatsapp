<template lang="pug">
.container
    q-btn(color="primary" label="Tambah" @click="addUser")
</template>
<script setup async>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../store/user.js'

const userStore = useUserStore()
const route = useRoute()
const user = await userStore.fetchUser(route.params.id)
</script>
