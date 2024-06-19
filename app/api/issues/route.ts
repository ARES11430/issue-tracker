import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/prisma/db';
import { issueSchema } from '@/app/validation/validationSchemas';
import { IssueBody } from '@/app/models/IssueModel';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/authOptions';

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions);
	if (!session) return NextResponse.json({ status: 401 });

	const body = (await req.json()) as IssueBody;

	const validation = issueSchema.safeParse(body);
	if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

	const issue = await prisma.issue.create({
		data: { title: body.title, description: body.description }
	});

	return NextResponse.json(issue, { status: 201 });
}
