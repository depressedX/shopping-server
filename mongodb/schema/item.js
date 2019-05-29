var mongoose = require('../../db'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {type: String},
    price: {type: Number},
    imgSrc: {type: String},
    added: {type: Boolean}
})


export const Item = mongoose.model('Item',ItemSchema)