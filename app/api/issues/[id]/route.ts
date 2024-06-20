import { IssueBody } from '@/app/models/IssueModel';
import { issueSchema, patchIssueSchema } from '@/app/validation/validationSchemas';
import prisma from '@/prisma/db';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

interface RouteParams {
	params: { id: string };
}

export async function PATCH(req: NextRequest, { params: { id } }: RouteParams) {
	const session = await getServerSession(authOptions);
	if (!session) return NextResponse.json({ status: 401 });

	const body = (await req.json()) as IssueBody;

	const validation = patchIssueSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.format(), {
			status: 400
		});

	const { title, description, assignedToUserId } = body;

	// * Check if the id is a valid number
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) {
		notFound();
	}

	if (assignedToUserId) {
		const user = await prisma.user.findUnique({
			where: { id: assignedToUserId }
		});
		if (!user) return NextResponse.json({ error: 'Invalid user.' }, { status: 400 });
	}

	const issue = await prisma.issue.findUnique({ where: { id: parsedId } });
	if (!issue) return NextResponse.json({ error: 'issue not found' }, { status: 404 });

	const updatedIssue = await prisma.issue.update({
		where: { id: issue.id },
		data: {
			title,
			description,
			assignedToUserId
		}
	});

	return NextResponse.json({ message: 'issue update successfully', updatedIssue }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params: { id } }: RouteParams) {
	const session = await getServerSession(authOptions);
	if (!session) return NextResponse.json({ status: 401 });

	// * Check if the id is a valid number
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) {
		notFound();
	}
	const issue = await prisma.issue.findUnique({
		where: { id: parsedId }
	});

	if (!issue) return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

	await prisma.issue.delete({
		where: { id: issue.id }
	});

	return NextResponse.json({});
}
