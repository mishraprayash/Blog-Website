
const express = require('express')
const router = express.Router()
const post = require('../models/post')


// to render title and description in every page we can do this.
const locals = {
    title: "NodeJs BLOG PROJECT",
    description: "Personal Blog Project Created With NodeJs"
}

// GET HOME
router.get('/', (req, res) => {
    res.render('index', { locals })
})

// GET ABOUT PAGE
router.get('/about', async (req, res) => {
    const data = await post.find()
    res.render('about', { locals })
    console.log(data)
})

router.get('/contact', (req, res) => {
    res.render('contact', { locals })
})

async function insertPostData() {
    const users_data = [{
        title: "NodeJs For Beginners",
        body: "Nodejs is a runtime environment for a javascript which can be used to create a remote server."
    },
    {
        title: "HTML,CSS and JAVASCRIPT",
        body: "These are the basic fundamentals required to develop a Web and also used in mobile app and desktop applications"
    }
    ]
    await post.insertMany(users_data)
}


module.exports = router