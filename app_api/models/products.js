var mongoose = require('mongoose');



var productShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }

});

mongoose.model('Product', productShema);