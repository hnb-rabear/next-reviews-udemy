import { PrismaClient } from '@prisma/client';

export const db = createPrismaClient();

/**
 * 
 * @returns {PrismaClient}
 */
function createPrismaClient() {
    if (!globalThis.PrismaClient)
        globalThis.PrismaClient = new PrismaClient({
            // log: [{ emit: 'stdout', level: 'query' }]
        });
    return globalThis.PrismaClient;
}