const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to ',url)

mongoose.connect(url)
  .then(console.log('connected successfully!'))
  .catch(error =>
  {
    console.log('Error connection to mongodb: ',error.message)
  })

const contactSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength:3,
    maxLength:15,
    required:true
  },
  number:{
    type:String,
    minlength:9,
    validate:{
      validator: function(v) {
        if(v.length === 11){
          return /\d{3}-\d{8}/.test(v)
        }
        else if(v.length === 9){
          return /\d{2}-\d{7}/.test(v)
        }
      },
      message:props => `${props.value} is not a valid phone number! Please make sure to add a dash! examples: 09-1234556 and 040-22334455 are valid phone numbers`
    },
    required:[true, 'User phone number required']
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contacts',contactSchema)