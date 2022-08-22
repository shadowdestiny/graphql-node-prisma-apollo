const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
    const deletePost = await prisma.post.delete({
        where: {
            id: 1
        }
    })

    console.log(deletePost);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
