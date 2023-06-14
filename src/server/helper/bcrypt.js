import bcrypt from 'bcrypt'
const cryptPassword = (password) =>
    bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => hash)

const comparePassword = (password, hashPassword) => bcrypt.compare(password, hashPassword).then((resp) => resp)

export { comparePassword, cryptPassword }
