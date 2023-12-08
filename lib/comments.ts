import type { Comment } from '@prisma/client';
import { db } from "./db";

export type CreateCommentData = Omit<Comment, 'id' | 'postedAt'>;

export async function createComment({ slug, user, message }) {
    return await db.comment.create({
        data: { slug, user, message },
    });
}

export async function getAllComments() {
    const allComments = await db.comment.findMany();
    return allComments;
}

export async function getComments(slug) {
    const comments = await db.comment.findMany({
        where: { slug },
        orderBy: { postedAt: "desc" },
    });
    return comments;
}
