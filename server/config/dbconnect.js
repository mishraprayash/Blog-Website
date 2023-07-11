const mongoose = require('mongoose')


const connectDB = async () => {
    const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING)
        .then(() => {
            console.log(`Database Connected Remotely`)
        }).catch(err => {
            mongoose.connect(process.env.DB_CONNECTION_STRING_LOCAL)
            console.log(`Database Connected Locally`)
        })

}
module.exports = connectDB

