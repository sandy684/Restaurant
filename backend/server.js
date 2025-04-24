const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/restaurant-orders', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
app.post('/order', async (req, res) => {
    try {
      const { items } = req.body; 
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        total += items[i].price;
      }
      const newOrder = new Order({items: items,total: total});
      await newOrder.save();
       res.status(200).json({message: 'Order placed successfully!',order: newOrder});
    } catch (err) {
      console.error('Error saving order:', err);
      res.status(500).json({ message: 'Failed to place order', error: err });
    }
  });
  
app.listen(5000, () => {
  console.log('Server running on ');
});
