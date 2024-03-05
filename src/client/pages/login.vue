<template>
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
</template>

<script setup>
const user = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
async function submit() {
    loading.value = true
    try {
        const response = await user.login({ email: email.value, password: password.value })
        if (response.success === true) {
            router.replace('/panel/dashboard')
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
