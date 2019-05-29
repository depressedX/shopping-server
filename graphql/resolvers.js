import mongoose from 'mongoose'

import {Item} from "../mongodb/schema/item";
import {CartItem} from "../mongodb/schema/cartItem";
import {User} from "../mongodb/schema/user";

export let resolvers = {
    Query: {
        item(_, {id}) {
            return Item.findOne({_id: id}).exec()
        },
        items() {
            return Item.find().exec()
        },
        cartItem(_, {id}) {
            return CartItem.findOne({_id: id}).exec()
        },
        cartItems() {
            return CartItem.find().exec()
        },
        me() {
            return User.findOne({name: 'lph'}).exec()
        }
    },
    Mutation: {
        login(_, {name}) {
            return User.findOrCreateUserByName(name)
                .then(user => user.name)
                .then(name => Buffer.from(name).toString('base64')
                )
        },
        logout() {
            return ""
        },
        submitOrder(_, {cartItemIdList}) {
            cartItemIdList = cartItemIdList
                .split(',')
                .map(v => parseInt(v))
                .forEach(id => {
                    CartItem.findOneAndDelete({_id: id})
                })
        },
        async uploadImage(parent, {file}) {

            const {stream, filename, mimetype, encoding} = await file;

            // 1. Validate file metadata.

            // 2. Stream file contents into cloud storage:
            // https://nodejs.org/api/stream.html

            // 3. Record the file upload in your DB.
            // const id = await recordFile( … )

            return fieldName
        },
        addItem(_,params){
            return Item.create(params).then(item=>item._id)
        },
        deleteItem(_,{id}){
            return Item.findOneAndDelete({_id:id})
        },
        updateItem(_,{id,...keys}){
            return Item.updateOne({_id:id},keys)
        },
        async addToCart(_,{itemId,num}){
            if (num <= 1) throw ('num must be > 0')
            let options = {upsert: true, new: true, setDefaultsOnInsert: true};
            return CartItem.findOneAndUpdate({itemId}, {num}, options);

        },

    }
}