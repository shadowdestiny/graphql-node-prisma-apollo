const {ApolloServer, gql} = require('apollo-server')

console.log(`hola curso ${process.env.NODE_PORT}`);

const typeDefs = gql `
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello: () => {
            return `hola curso ${process.env.NODE_PORT}`
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`servidor iniciado en ${url}`);
});
