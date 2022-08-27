const {PrismaClient} = require('../../prisma/mysql/generated/client')

const prisma = new PrismaClient();

async function main() {
    const post = await prisma.post.findUnique({
        where: {
            id:3
        }
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
