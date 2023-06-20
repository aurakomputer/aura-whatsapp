<template>
    <div
        :class="{
            'text-center q-pa-lg': !horizontal,
            'flex justify-center items-center q-gutter-md q-pa-md horizontal': horizontal,
        }"
    >
        <q-spinner color="primary" :size="size" :thickness="thickness" />
        <div>
            <span class="q-mt-md text-italic" v-if="text">
                <small>{{ text }}</small>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        thickness: {
            type: Number,
            default: 1,
        },
        size: {
            type: String,
            default: '100px',
        },
        text: {
            type: String,
            default: null,
        },
        horizontal: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {}
    },
}
</script>
<style type="text/css" scoped>
.horizontal {
    text-align: center;
    align-item: center;
}
</style>
