import prisma from '@/prisma/db';
import { Box, Flex, Grid } from '@radix-ui/themes';

import { notFound } from 'next/navigation';

import '@/app/markdown-styles.css';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';

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
		<Grid columns={{ initial: '1', md: '5' }} gap='5'>
			<Box className='lg:col-span-4'>
				<IssueDetails issue={issue} />
			</Box>
			<Box>
				<Flex direction='column' gap='4'>
					<EditIssueButton issueId={issue.id} />
					<DeleteIssueButton issueId={issue.id} />
				</Flex>
			</Box>
		</Grid>
	);
};

export const dynamic = 'force-dynamic';

export default IssueDetailPage;
