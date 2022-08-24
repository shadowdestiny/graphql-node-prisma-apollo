const {ApolloServer, gql} = require('apollo-server')
const {loadTypedefsSync} = require('@graphql-tools/load')
const {GraphQLFileLoader} = require('@graphql-tools/graphql-file-loader')
const {join} = require("path");
const fs = require('fs')
const {v4: uuidv4} = require('uuid')

const aeropuertos = JSON.parse(
    fs.readFileSync(join(__dirname, './data/dataset.json'), 'utf8')
)

console.log(aeropuertos);

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
        },
        obtenerAeropuertoPorId:  (obj, args) => {
            const response = aeropuertos.filter(aeropuerto => {
                return aeropuerto.id === args.id
            })
            if (response.length === 0){
                throw 'Aeropuerto no encontrados'
            }
            return response[0]
        },
        obtenerAeropuerto:  (obj, {id, localizacion}) => {
            const response = aeropuertos.filter((aeropuerto) => {
              if (aeropuerto.localizacion === localizacion || aeropuerto.id === id)  {
                return aeropuerto
              }
            });
            if (response.length === 0){
                throw 'Aeropuerto no encontrados'
            }
            return response[0]
        }
    },

    Mutation: {
        crearPasajero: (obj, {idAvion, nombre, apellido}) => {
            const pasajero = {id: uuidv4(), nombre, apellido}

            let insertado = false
            aeropuertos.forEach(aeropuerto => {
                aeropuerto.aviones.forEach(avion => {
                    if (avion.id === idAvion){
                        avion.pasajeros.push(pasajero)
                        insertado = true;
                        return
                    }
                })
            })

            if (insertado){
                return pasajero
            }

            throw 'Avion no existe';
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

server.listen({ port: 4001 }).then(({url}) => {
    console.log(`servidor iniciado en ${url}`);
});
