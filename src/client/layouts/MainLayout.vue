<template lang="pug">
div
    template(v-if="!user.detail")
        .window-height.window-width.fullscreen
            Loading.fixed-center(text="Memuat data")
    q-layout(view="hHh Lpr lFf" v-else)
        q-header(elevated)
            q-toolbar
                q-btn(flat, dense, round, @click="toggleLeftDrawer", icon="mdi-menu", aria-label="Menu")
                q-toolbar-title  Aura Whatsapp Admin Panel
                q-space
                .q-gutter-sm.row.items-center.no-wrap
                    q-btn(round, flat)
                        q-avatar(size="26px")
                            img(src="https://cdn.quasar.dev/img/boy-avatar.png")

                        q-menu.text-center(style="min-width: 20em" :offset="[20, 20]")
                            .q-gutter-md.q-pa-md
                                q-avatar(color="white" size="10em")
                                    q-img(src="https://cdn.quasar.dev/img/boy-avatar.png")

                                div(style="font-size: 1.3em") {{ user.detail.name }}
                                div {{ user.detail.email }}
                                q-separator
                                div
                                    q-btn(label="Logout" push color="dark" @click="user.logout()")
        q-drawer(v-model="leftDrawerOpen", show-if-above, bordered)
            q-list
                q-item(v-for="r in navigationLinks" :to="r.to")
                    q-item-section(avatar)
                        q-icon(:name="r.icon")
                    q-item-section
                        q-item-label {{ r.name }}
        q-page-container.bg-grey-2
            q-page(padding)
                router-view

</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../store/user.js'

const user = useUserStore()
if (!user.user) {
    user.fetchAuth()
}
const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const navigationLinks = [
    {
        to: {
            name: 'dashboard',
        },
        name: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
    },
    {
        to: {
            name: 'users',
        },
        name: 'Kelola Pengguna',
        icon: 'mdi-account',
    },
]
</script>

<style>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
    animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
    0% {
        transform: scale(1);
    }
    5% {
        transform: scale(1.25);
    }
    20% {
        transform: scale(1);
    }
    30% {
        transform: scale(1);
    }
    35% {
        transform: scale(1.25);
    }
    50% {
        transform: scale(1);
    }
    55% {
        transform: scale(1.25);
    }
    70% {
        transform: scale(1);
    }
}
</style>
