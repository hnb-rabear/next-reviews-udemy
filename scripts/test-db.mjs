import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({
    log: [{ emit: 'stdout', level: 'query' }]
});

async function createComment() {
    const comment = await db.comment.create({
        data: {
            slug: 'stardev-valley',
            user: 'Bob',
            message: "Hello Everyone!",
        },
    });
    console.log(comment);
}

async function getAllComments() {
    const allComments = await db.comment.findMany();
    console.log(allComments);
}

async function getComments(slug) {
    const comments = await db.comment.findMany({
        where: { slug: slug },
    });
    console.log(comments);
}
