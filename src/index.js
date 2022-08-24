const {ApolloServer, gql} = require('apollo-server')
const {loadTypedefsSync} = require('@graphql-tools/load')
const {GraphQLFileLoader} = require('@graphql-tools/graphql-file-loader')
const {join} = require("path");

const sources = loadTypedefsSync(join(__dirname, './types/typeDefs.gql'), {
    loaders: [
        new GraphQLFileLoader()
    ]
})

const typeDefs = sources.map(source => source.document)

console.log(`hola curso ${process.env.NODE_PORT}`);

/*const typeDefs = gql `
    type Query {
        hello: String
    }
`*/
const resolvers = {
    Query: {
        listarAeropuertos: () => {
            return [{id: "hola", localizacion: "mundo", rutas: [], aviones: []}]
        }
    }
}
/*const resolvers = {
    Query: {
        hello: () => {
            return `hola curso ${process.env.NODE_PORT}`
        }
    }
}*/

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`servidor iniciado en ${url}`);
});
