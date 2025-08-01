import express from 'express'
import userSchema from '../models/users.js'

const router = express.Router()

router.post( '/users', (req , res) => {
    const user = new userSchema(req.body)
    user
    .save()
    .then(data => res.json(data))
    .catch(error => res.json(error))
}  )

export default router