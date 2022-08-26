const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {

    const user = await prisma.user.createMany({
        data: [
            { id: 1, email: 'lrm.programador@gmail.com', name: 'Luis' },
            { id: 2, email: 'info@cualquiercosa.com', name: 'Lorem' },
        ]
    })
    console.log(user);
    const post = await prisma.post.createMany({
        data: [
            { title: 'Titulo 2', content: 'Este es el primer post', authorId: 1 },
            { title: 'Titulo 3', content: 'Este es el primer post 3', authorId: 1},
            { title: 'Titulo 4', content: 'Este es el primer post 4', authorId: 2 },
        ]
    })
    console.log(post);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
