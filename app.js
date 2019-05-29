import Koa from 'koa'
import KoaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'

import {database} from './mongodb'
import {typeDefs} from "./graphql/schemas";
import {ApolloServer} from "apollo-server-koa";
import {resolvers} from "./graphql/resolvers";

database() // 链接数据库并且初始化数据模型

const spdy  = require('spdy');
const options = require('./keys');  // 这里输出的是证书
class KoaOnHttps extends Koa {
    constructor() {
        super();
    }

    listen(...args) {
        const server = spdy.createServer(options, this.callback);
        return server.listen(...args);
    }
}

const app = new KoaOnHttps()
// const app = new Koa()

app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

const server = new ApolloServer({
    typeDefs,
    resolvers
    // resolvers,
});
server.applyMiddleware({app})

app.listen(3000);