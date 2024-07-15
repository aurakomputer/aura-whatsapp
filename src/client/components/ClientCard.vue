<template lang="pug">
q-card
    q-item
        q-item-section(avatar)
            q-icon(name='mdi-whatsapp', :color='connected ? "positive" : "negative"')
        q-item-section
            q-item-label {{ client.name }}
            q-item-label(caption) {{ client.phoneNumber }}
        q-item-section(side, v-if='showButton')
            q-btn(
                icon='mdi-book-search-outline',
                color='primary',
                round,
                dense,
                size='sm',
                :to='`/panel/clients/${client.id}`'
            )
</template>
<script setup>
const props = defineProps({
    client: Object,
    showButton: {
        default: true,
    },
})

const connected = ref(false)

// TODO: otomatis mengupdate status menggunakan websocket
let loopingGetStatus
async function getSessionStatus() {
    const response = await api.get('/clients/' + props.client.id)
    connected.value = response.client.connected
    // console.log(response)

    loopingGetStatus = setTimeout(() => {
        getSessionStatus()
    }, 3000)
}

getSessionStatus()

onBeforeUnmount(() => {
    clearTimeout(loopingGetStatus)
})
</script>
