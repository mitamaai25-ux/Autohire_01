import { prisma } from './prisma';

export async function writeAuditLog(input: {
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: string;
}) {
  await prisma.auditLog.create({ data: input });
}
