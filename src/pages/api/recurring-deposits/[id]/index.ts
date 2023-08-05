import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { recurringDepositValidationSchema } from 'validationSchema/recurring-deposits';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.recurring_deposit
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRecurringDepositById();
    case 'PUT':
      return updateRecurringDepositById();
    case 'DELETE':
      return deleteRecurringDepositById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRecurringDepositById() {
    const data = await prisma.recurring_deposit.findFirst(convertQueryToPrismaUtil(req.query, 'recurring_deposit'));
    return res.status(200).json(data);
  }

  async function updateRecurringDepositById() {
    await recurringDepositValidationSchema.validate(req.body);
    const data = await prisma.recurring_deposit.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteRecurringDepositById() {
    const data = await prisma.recurring_deposit.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
