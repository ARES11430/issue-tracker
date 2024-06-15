import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/db';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import Markdown from 'react-markdown';
import { notFound } from 'next/navigation';

import '@/app/markdown-styles.css';

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
			<Heading>{issue.title}</Heading>
			<Flex gap='3' my='2'>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toLocaleString()}</Text>
			</Flex>
			<Card>
				<Markdown className='markdown-body'>{issue.description}</Markdown>
			</Card>
		</div>
	);
};

export default IssueDetailPage;
