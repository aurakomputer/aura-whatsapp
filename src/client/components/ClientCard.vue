<template lang="pug">
q-card()
    q-item
        q-item-section(avatar)
        q-item-section
            q-item-label() {{ client.id }}
            q-item-label(caption) {{ client.phoneNumber }}
        q-item-section(side)
            q-btn(icon="mdi-book-search-outline" color="primary" round dense size='sm' :to="{name: 'clients.detail', params: {id: client.id}}")
</template>
<script setup>
const props = defineProps({
    client: Object,
    showButton: {
        default: true,
    },
})
</script>
