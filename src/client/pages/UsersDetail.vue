<template lang="pug">
NoItems(v-if="!user" :loading="loading.user")
.row.q-col-gutter-lg(v-else)
    .col-12.col-sm-6.col-md-4
        q-card.no-shadow(bordered)
            q-card-section
                .text-h6 Detail Pengguna
                q-avatar.shadow-10(size="100px")
                    img(:src="user.avatar")
            q-card-section.q-pt-none
                .text-subtitle1
                    | {{ user.name }}
                .text-caption.text-grey
                    | {{ user.email }}

    .col-12.col-sm-6.col-md-4
        WhatsappClients(:userId="user.id")
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../store/user.js'

import WhatsappClients from '../components/WhatsappClients.vue'
const userStore = useUserStore()
const route = useRoute()
const user = ref(null)
const loading = ref({
    user: false,
})

async function getUser() {
    loading.value.user = true
    const response = await userStore.fetchUser(route.params.id)
    user.value = response.user
    loading.value.user = false
}

getUser()
</script>
