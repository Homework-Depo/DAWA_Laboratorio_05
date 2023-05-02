import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  }
})

userSchema.virtual('password')
  .set(function (password) {
    this._password = password
    this.passwordHash = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, 10)
}

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

const User = model('User', userSchema)

export default User