import prisma from '@/prisma/db';
import { notFound } from 'next/navigation';

interface Props {
	params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
	// * Check if the id is a valid number
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) {
		notFound();
	}

	const issue = await prisma.issue.findUnique({ where: { id: parsedId } });

	if (!issue) notFound();

	return (
		<div>
			<p>{issue.id}</p>
			<p>{issue.title}</p>
			<p>{issue.description}</p>
			<p>{issue.status}</p>
			<p>{issue.createdAt.toLocaleString()}</p>
		</div>
	);
};

export default IssueDetailPage;
