import { db } from "./db";

export async function createComment({ slug, message, user }) {
    const comment = await db.comment.create({
        data: {
            slug: slug,
            user: user,
            message: message,
        },
    });
    return comment;
}

export async function getAllComments() {
    const allComments = await db.comment.findMany();
    return allComments;
}

export async function getComments(slug) {
    const comments = await db.comment.findMany({
        where: { slug },
        orderby: { postedAt: "desc" },
    });
    return comments;
}
