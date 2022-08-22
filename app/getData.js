const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
    const allPost = await prisma.post.findMany()
    console.log(allPost);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
