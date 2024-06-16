import { IssueBody } from '@/app/models/IssueModel';
import { issueSchema } from '@/app/validation/validationSchemas';
import prisma from '@/prisma/db';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
	params: { id: string };
}

export async function PATCH(req: NextRequest, { params: { id } }: RouteParams) {
	const body = (await req.json()) as IssueBody;

	const validation = issueSchema.safeParse(body);
	if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

	// * Check if the id is a valid number
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) {
		notFound();
	}

	const issue = await prisma.issue.findUnique({ where: { id: parsedId } });
	if (!issue) return NextResponse.json({ error: 'issue not found' }, { status: 404 });

	const updatedIssue = await prisma.issue.update({
		where: { id: issue.id },
		data: {
			title: body.title,
			description: body.description
		}
	});

	return NextResponse.json({ message: 'issue update successfully', updatedIssue }, { status: 200 });
}
