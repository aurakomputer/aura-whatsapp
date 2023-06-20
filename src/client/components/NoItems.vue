<template lang="pug">
.full-width
  div
    .text-center
      LogoAnimation(size='100px' v-if='loading')
      q-icon(v-else='' color='primary' :name='iconName' :size='iconSize')
      div
        span(:class='textClass')
          | {{ loading ? __(loadingText) : __(text) }}
    q-card-section
      slot(name='actions')

</template>

<script>
import LogoAnimation from './LogoAnimation.vue'
export default {
    components: {
        LogoAnimation,
    },
    name: 'NoItems',
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        textClass: {
            type: String,
            default: 'text-weight-light',
        },
        loadingText: {
            type: String,
            default: 'Sedang memuat data ...',
        },
        text: {
            type: String,
            default: 'Tidak Ada data',
        },
        iconSize: {
            type: String,
            default: '100px',
        },
        iconName: {
            type: String,
            default: 'mdi-emoticon-cry-outline',
        },
    },
    data() {
        return {}
    },
}
</script>
