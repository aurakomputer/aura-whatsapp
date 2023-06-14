<template>
    <q-layout>
        <q-page-container>
            <q-page class="flex bg-image flex-center">
                <q-card v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }">
                    <q-card-section>
                        <div class="text-center q-pt-lg">
                            <div class="col text-h6 ellipsis">Log in</div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-form class="q-gutter-md" @submit="submit">
                            <q-input filled v-model="email" label="Email" lazy-rules />

                            <q-input type="password" filled v-model="password" label="Password" lazy-rules />

                            <div>
                                <q-btn label="Login" type="submit" color="primary" />
                            </div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import UsersApi from '@/api/Users.js'

const email = ref('')
const password = ref('')
const loading = ref(false)
async function submit() {
    loading.value = true
    try {
        const response = await UsersApi.login({ email: email.value, password: password.value })
        if (response.status) {
        }
    } finally {
        loading.value = false
    }
}
</script>

<style>
.bg-image {
    background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
