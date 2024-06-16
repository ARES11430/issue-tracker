import React from 'react';
import IssueForm from '../../_components/IssueForm';
import prisma from '@/prisma/db';
import { notFound } from 'next/navigation';

interface Props {
	params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: Props) => {
	// * Check if the id is a valid number
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) {
		notFound();
	}

	const issue = await prisma.issue.findUnique({ where: { id: parsedId } });

	if (!issue) return notFound();

	return <IssueForm issue={issue} buttonText='Update Issue' />;
};

export default EditIssuePage;
