const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
    const post = await prisma.post.createMany({
        data: [
            { title: 'Titulo 2', content: 'Este es el primer post' },
            { title: 'Titulo 3', content: 'Este es el primer post 3' },
            { title: 'Titulo 4', content: 'Este es el primer post 4' },
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
