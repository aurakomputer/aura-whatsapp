import { Notify } from 'quasar'

// Lets Register a Global Error Notification Toast.
const toast = {
    request: function (Status, Pesan) {
        const text = `${Pesan}`
        if (Status) {
            toast.success(text)
        } else {
            toast.error(text)
        }
    },
    success: function (title, Pesan) {
        return Notify.create({
            type: 'positive',
            caption: Pesan,
            message: title,
        })
    },
    error: function (title, Pesan) {
        return Notify.create({
            type: 'negative',
            caption: Pesan,
            message: title,
        })
    },
    info: function (title, Pesan) {
        return Notify.create({
            type: 'positive',
            caption: Pesan,
            message: title,
        })
    },
    app_error: function (Pesan) {
        return Notify.create({
            type: 'negative',
            message: Pesan,
        })
    },
}

export default toast
