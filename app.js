const express = require('express')
const app =express()




const productRoutes = require('./routes/product')
const logger = require ('./middleware/logger') 

app.set('view engine','ejs')
app.set('views','./views')

app.get('/',(req,res) => {
    res.render('index',
        {
            title:"Home Page"
        }
    )
})
app.get('/about',(req,res) => {
    res.render('index',
        {
            title:"About Page"
        }
    )
})


app.get('/user/:id',(req,res) => {
        const userId = req.params.id;

    users=[
        {},
         {}, 
         {},
          {},
           {},
    ]
    const userDetails = u
       res.render('index',
        {
            title:"About Page"
        }
    )

})

app.use(express.json())

app.use('/product',logger,productRoutes)
app.use(express.static('public'))

app.use((req,res) => {
res.status(404).send('No page found')
})




app.listen(8080), ()=>{
    console.log('server started')
 } 