const {ApolloServer, gql} = require('apollo-server')
const {loadTypedefsSync} = require('@graphql-tools/load')
const {GraphQLFileLoader} = require('@graphql-tools/graphql-file-loader')
const {join} = require("path");
const fs = require('fs')
const {v4: uuidv4} = require('uuid')

const {PrismaClient} = require('../prisma/mysql/generated/client')
const {PrismaClient: PrismaClient2} = require('../prisma/postgres/generated/client1')

const aeropuertos = JSON.parse(
    fs.readFileSync(join(__dirname, './data/dataset.json'), 'utf8')
)

const sources = loadTypedefsSync(join(__dirname, './types/typeDefs.gql'), {
    loaders: [
        new GraphQLFileLoader()
    ]
})

const typeDefs = sources.map(source => source.document)
const prisma = new PrismaClient();
const prisma2 = new PrismaClient2();

console.log(`run server on ${process.env.NODE_PORT}`);

const resolvers = {
    Query: {
        listarAeropuertos: () => {
            return aeropuertos
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
        },
        allUsers: () => {
            return prisma.user.findMany({
                include: {
                    post: true,
                }
            })
        },
        allUsersPostgres: () => {
            return prisma2.user.findMany({
                include: {
                    post: true,
                }
            })
        },
        allPost: () => {
            return prisma.post.findMany({
                include: {
                    user: {
                        include: {
                            post: true
                        }
                    },
                }
            })
        },
        allPostByUser: (obj, {userId}) => {
            return prisma.post.findMany({
                where: {
                    authorId: userId
                },
                include: {
                    user: true
                }
            })
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
        },
        actualizarVelocidadHora: (obj, {idAvion, velocidadHora}) => {
            console.log("hola")
            let returnValue = null
            console.log(idAvion)
            aeropuertos.map(aeropuerto => {
                aeropuerto.aviones = aeropuerto.aviones.map(avion => {
                    if(avion.id === idAvion){
                        console.log(avion.id, idAvion)
                        avion.velocidadHora = velocidadHora
                        returnValue = avion
                    }
                    return avion
                })
                return aeropuerto
            })
            if (returnValue){
                return returnValue;
            }
            throw 'Avion no existente';
        },
        vaciarPasajeros: (obj, {idAvion}) => {
            let returnValue = null
            aeropuertos.map(aeropuerto => {
                aeropuerto.aviones = aeropuerto.aviones.map(avion => {
                    if(avion.id === idAvion){
                        console.log(avion.id, idAvion)
                        avion.velocidadHora = []
                        returnValue = avion
                    }
                    return avion
                })
                return aeropuerto
            })
            if (returnValue){
                return returnValue;
            }
            throw 'Avion no existente';
        },
        addUser: (obj, {email, name}) => {
            return prisma.user.create({
                data: {
                    email,
                    name,
                },
                /*include: {
                    posts: true
                }*/
            })
        },
        addPostUser: (obj, {title, content, email}) => {
            return prisma.post.create({
                data: {
                    title,
                    content,
                    user: {
                        connect: {email}
                    }
                },
                include: {
                    user: true
                }
            })
        },

        addPostUserById: (obj, {title, content, userId}) => {
            return prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: userId
                },
                include: {
                    user: true
                }
            })
        },

        updateUser: (obj, {name, email}) => {
            return prisma.user.update({
                where: {
                    email,
                },
                data: {
                    name,
                },
                include: {
                    post: true
                }
            })
        },
        deleteUser: (obj, {id,}) => {
            return prisma.user.delete({
                where: {
                    id,
                }
            })
        },
        deletePost: (obj, {id}) => {
           return prisma.post.delete({
                where: {
                    id
                },
            })
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,  // see below for more about this
    cache: "bounded",
    cors: {
        origin: "*",
        credentials: true
    },
    /*introspection: false,
    playground: false,*/
})

server.listen({
    port: 4001,
}).then(({url}) => {
    console.log(`servidor iniciado en ${url}`);
});
