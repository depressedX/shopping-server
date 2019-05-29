import {User} from "./user";

var mongoose = require('../../db'),
    Schema = mongoose.Schema;

var CartItemSchema = new Schema({
    itemId: {type: String},
    num: {type: Number}
})


export let CartItem = mongoose.model('CartItem', CartItemSchema)