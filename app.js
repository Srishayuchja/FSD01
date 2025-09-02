const express = require('express');
const mongoose = require('mongoose');
//const Product = require('./models/product');             

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://srishayi04:sn6pQ5fYtUe6ZRmG@cluster2.10w1hnw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2')

.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const productRoutes = require('./routes/product');
app.use('/product', productRoutes);



app.use((req,res) => {
res.status(404).send('No page found')
})

app.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});