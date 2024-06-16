import prisma from '@/prisma/db';
import { Box, Grid } from '@radix-ui/themes';

import { notFound } from 'next/navigation';

import '@/app/markdown-styles.css';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

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
		<Grid columns={{ initial: '1', md: '2' }} gap='5'>
			<Box>
				<IssueDetails issue={issue} />
			</Box>
			<Box>
				<EditIssueButton issueId={issue.id} />
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
