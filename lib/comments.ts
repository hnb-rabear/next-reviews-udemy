import type { Comment } from '@prisma/client';
import { db } from "./db";

export async function createComment({ slug, user, message }: { slug: string, user: string, message: string; }) {
    return await db.comment.create({
        data: { slug, user, message },
    });
}

export async function getAllComments(): Promise<Comment[]> {
    const allComments = await db.comment.findMany();
    return allComments;
}

export async function getComments(slug: string): Promise<Comment[]> {
    // simulate delay
    // await new Promise(resolve => setTimeout(resolve, 10000));
    const comments = await db.comment.findMany({
        where: { slug },
        orderBy: { postedAt: "desc" },
    });
    return comments;
}
