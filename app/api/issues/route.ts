import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/db';

interface Issue {}

const createIssueSchema = z.object({
	title: z.string().min(1).max(250),
	description: z.string().min(1)
});

export async function POST(req: NextRequest) {
	const body = await req.json();

	const validation = createIssueSchema.safeParse(body);
	if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

	const issue = await prisma.issue.create({
		data: { title: body.title, description: body.description }
	});

	return NextResponse.json(issue, { status: 201 });
}