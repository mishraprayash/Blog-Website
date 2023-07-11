
const express = require('express')
const router = express.Router()
const post = require('../models/post')


// to render title and description in every page we can do this.


// GET HOME
router.get('/', async (req, res) => {
    try {
        // const data = await post.find()
        // we are passing data as well as locals in the index page so that we can render it in the client side.
        //  the use of ejs comes in here, we can see index.ejs where we render this database data.


        // implementing pagination 

        // how many post you want to show per page.
        const perPage = 2;
        // which page are you on, by default it is 1
        const page = req.query.page || 1

        //  this is mongoose query to 
        const data = await post.aggregate([{ $sort: { createdAt: -1 } }])
            // at once it is able to skip certain number to pages to be shown.            
            .skip(perPage * page - perPage)
            //  it limits how many pages can be seen at a time it they exists
            .limit(perPage)
            // this enables the execution of this query
            .exec();

        //  it counts the number of posts
        const count = await post.count()
        // it points to the nextpage which is the current page + 1.
        const nextPage = parseInt(page) + 1
        // this variable checks if there is still remaninig posts that can be displayed in next page and returns a boolean value
        const hasNextPage = nextPage <= Math.ceil(count / perPage)
        // and here we are passing different values so that we can render it through ejs in the index.ejs file in this case.

        const locals = {
            title: data.title,
            description: "Personal Blog Project Created With NodeJs"
        }
        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        })
    } catch (error) {
        console.log(error)
    }

})

// GET ABOUT PAGE
router.get('/about', (req, res) => {
    const locals = {
        title: "NodeJs BLOG PROJECT",
        description: "Personal Blog Project Created With NodeJs"
    }
    res.render('about', { locals })
})

router.get('/contact', (req, res) => {
    const locals = {
        title: "NodeJs BLOG PROJECT",
        description: "Personal Blog Project Created With NodeJs"
    }
    res.render('contact', { locals })
})


// POST ROUTE
// displaying blog post routes
router.get('/post/:id', async (req, res) => {
    try {
        // slug is basically a unique identifier to have a meaningful URL for different endpoints
        // it grabs the id that is passed in the request from the client side.
        let slug = req.params.id;

        // this command queries the db passing the above id
        const data = await post.findById({ _id: slug })

        const locals = {
            title: data.title,
            description: "Personal Blog Project Created With NodeJs"
        }

        // console.log(data, slug)
        // rendering the post page with passing diff arguments and data
        res.render('post', { locals, data })
    } catch (error) {
        console.log(error)
    }
})

// post route for search


router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "Personal Blog Project Created With NodeJs"
        }

        // to use the req.body we need to use the middleware to parse it.
        let searchTerm = req.body.searchTerm

        // creating a regex to remove any special characters from a search term
        // ^ -> negation
        // \w -> equivalent to [a-zA-Z0-9_]
        // \s -> matches any whitespace character, such as spaces, tabs, or line breaks
        // g -> global search 

        // thus it measn the negation of [a-zA-Z0-9_] and whitespaces both which filtered out to be special characters.
        let regex = /[^\w\s]/g

        //  this here removes if any regex characters found replce it with ''.

        let filteredSearchTerm = searchTerm.replace(regex, '')

        // the $or operator is used beacause we want to retrieve the date if the search term if found in any one
        //  of between body or title.
        // we are also passing 'i' with filteredSearchTerm for case insensitive search
        const data = await post.find({
            $or: [
                { title: { $regex: new RegExp(filteredSearchTerm, 'i') } },
                { body: { $regex: new RegExp(filteredSearchTerm, 'i') } }
            ]
        })
       res.render('search', { locals, data })

    } catch {

    }
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