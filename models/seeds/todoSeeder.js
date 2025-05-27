import db from '../../config/mongoose.js'
import Todo from '../todo.js'
import bcryptjs from 'bcryptjs'
import User from '../user.js'

const MOCK_USER = {
  name: 'mock',
  email: 'mock@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcryptjs.genSalt(10)
  .then(salt => bcryptjs.hash(MOCK_USER.password, salt))
  .then(hash => User.create({ 
    name: MOCK_USER.name, 
    email: MOCK_USER.email, 
    password: hash
  }))
  .then(user => {
    const userId = user._id
    return Promise.all(Array.from({ length: 10 }, (_, index) => {
      return Todo.create({ name: `todo-${index}`, userId})
    }))
  })
  .then(() => {
    console.log('done!')
    process.exit()
  })
}) 