<template>
    <q-spinner color="primary" :size="size" :thickness="1" />
</template>

<script>
export default {
    name: 'LogoAnimaton',
    props: {
        size: {
            type: String,
            default: '100px',
        },
    },
    data() {
        return {}
    },
}
</script>
