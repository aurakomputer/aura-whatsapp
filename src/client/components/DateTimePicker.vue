<template>
    <q-field ref="fieldRef" :readonly="readonly" :stackLabel="computeStackLabel" :modelValue="modelValue">
        <template v-slot:control>
            <div class="self-center full-width no-outline full-height" tabindex="0" @click="$refs.qDateProxy.show()">
                <template v-if="modelValue">
                    {{ moment(modelValue).format(labelFormatComputed) }}
                </template>
            </div>
        </template>

        <template v-slot:prepend>
            <q-icon name="mdi-calendar" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" cover>
                    <q-date :modelValue="modelValue" @update:modelValue="selectDate" :mask="valueFormatComputed" />
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-field>
</template>

<script setup>
import moment from 'moment'
import { ref, computed } from 'vue'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    enableTime: {
        type: Boolean,
        default: false,
    },
    modelValue: String,
    readonly: {
        type: Boolean,
        default: false,
    },
    disable: {
        type: Boolean,
        default: false,
    },
    momentFormat: {
        type: String,
        default: 'LL',
    },
    valueFormat: {
        type: String,
    },
    labelFormat: {
        type: String,
    },
    stackLabel: Boolean,
})

const date = ref(null)
const fieldRef = ref(null)
const qDateProxy = ref(null)

function format(date) {
    const format = moment(date).format(props.momentFormat)
    return format
}

const labelFormatComputed = computed(() => {
    // format yang di tampilkan untuk user
    if (props.labelFormat) return props.labelFormat
    return !props.enableTime ? 'D MMM YYYY' : 'D MMM YYYY HH:mm'
})

const valueFormatComputed = computed(() => {
    // format yang di simpan oleh system
    if (props.valueFormat) return props.valueFormat
    return !props.enableTime ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
})

const computeStackLabel = computed(() => {
    // stackLabel otomatis true ketika tanggal sudah di pilih
    return props.stackLabel || !!props.modelValue
})

function selectDate(value) {
    emits('update:modelValue', value)
    qDateProxy.value.hide()
    // fieldRef.value.validate()
}
</script>
