
import {gql} from 'apollo-server-koa'
// 导出GraphQLSchema模块

export let typeDefs = gql`
    scalar None
    type  Item{
        id:ID!,
        name:String,
        price:Float,
        imgSrc:String
    }
    type CartItem{
        id:ID!,
        item:Item,
        num:Int
    }
    type User{
        id:ID!,
        name:String
    }
    type Query{
        item(id:ID!):Item,
        items:[Item]!
        cartItem(id:ID!):CartItem,
        cartItems:[CartItem]!
        me:User
    }
    scalar URL
    type Mutation{
        login(name:String):String,
        logout:String,
#        cartItem:,分割的cartTItemId
        submitOrder(cartItemIdList:String!):None,
        uploadImage(file:Upload!):URL,
        addItem(name:String!,price:Float!,imgSrc:URL):None,
        deleteItem(id:ID!):None,
        updateItem(id:ID!,name:String,price:Float,imgSrc:URL):None,
        addToCart(itemId:ID!,num:Int!):None,
        updateCartItemInfo(id:ID!,num:Int!):None,
        deleteCartItemBunchly(cartItemIdList:String!):None
    }
`
