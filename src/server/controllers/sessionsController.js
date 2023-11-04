import { isSessionExists, sessionStatus, createSession, getSession, deleteSession } from './../whatsapp.js'
import response from './../response.js'

const find = (req, res) => {
    response(res, 200, true, 'Session found.')
}

const status = (req, res) => {
    const state = sessionStatus(res.locals.sessionId)
    response(res, 200, true, '', { status: state })
}

const add = (req, res) => {
    const { id } = req.body

    if (isSessionExists(id)) {
        return response(res, 409, false, 'Session already exists, please use another id.')
    }

    createSession(id, res)
}

const del = async (req, res) => {
    const { id } = req.params
    const session = getSession(id)

    try {
        await session.logout()
    } catch {
    } finally {
        deleteSession(id)
    }

    response(res, 200, true, 'The session has been successfully deleted.')
}

export { find, status, add, del }
