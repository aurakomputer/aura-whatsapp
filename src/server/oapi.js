import Openapi from '@wesleytodd/openapi'
const oapi = Openapi({
    openapi: '3.0.0',
    info: {
        title: 'Aura WhatsApp Gateway',
        description: 'Aplikasi Whatsapp Gateway untuk mengirimkan pesan whatsapp dimanapun dan kapanpun',
        version: '1.0.0',
    },
})

export default oapi
