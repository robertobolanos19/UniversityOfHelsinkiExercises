const mongoose = require('mongoose')

if(process.argv.length < 3)
{
    console.log('give name as argument')
    process.exit(1)
} 

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = 
`mongodb+srv://test123:${password}@fullstackopenphonebookd.9bxo3fy.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name:String,
    number:String,
})
    
const Contact = mongoose.model('Contact', contactSchema)
    

if(process.argv.length > 3){
    console.log('adding an account')
    console.log(`the name is ${name} and the number is ${number}`)

    const contact = new Contact({
        name:`${name}`,
        number:`${number}`,
    })
    
    contact.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

else if (process.argv.length === 3)
{
    console.log('checking accounts')
    Contact.find({}).then(result =>{
        console.log('Phonebook:')
        result.forEach(contact=>{
            console.log(contact.name, contact.number)
        })
        mongoose.connection.close()
    })
}