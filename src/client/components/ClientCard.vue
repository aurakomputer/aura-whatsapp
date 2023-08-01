<template lang="pug">
q-card()
    q-item
        q-item-section(avatar)
        q-item-section
            q-item-title {{ client.name }}
            q-item-title(caption) {{ client.phoneNumber }}

</template>
<script setup>
const props = defineProps({
    client: Object,
})
</script>
