<template lang="pug">
q-page.flex.flex-center
    q-card
        q-card-section Selamat datang di aura Whasapp
        q-card-actions
            q-btn(to="/login" label="Login" color='primary')
</template>
<script setup></script>

<route lang="yaml">
meta:
    layout: default
</route>
