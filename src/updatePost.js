const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
    const updatePost = await prisma.post.update({
        where: {
            id: 4
        },
        data: {
            title: 'Titulo cambiado a 4',
            content: 'contenido editado'
        }
    })

    console.log(updatePost);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
