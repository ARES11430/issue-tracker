import prisma from '@/prisma/db';
import { Box, Flex, Grid } from '@radix-ui/themes';

import { notFound } from 'next/navigation';

import '@/app/markdown-styles.css';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

interface Props {
	params: { id: string };
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

const IssueDetailPage = async ({ params: { id } }: Props) => {
	const session = await getServerSession(authOptions);

	// * Check if the id is a valid number
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) {
		notFound();
	}

	const issue = await fetchUser(parsedId);

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', md: '5' }} gap='5'>
			<Box className='lg:col-span-4'>
				<IssueDetails issue={issue} />
			</Box>
			{session && (
				<Box>
					<Flex direction='column' gap='4'>
						<AssigneeSelect issue={issue} />
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
					</Flex>
				</Box>
			)}
		</Grid>
	);
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props) {
	const issue = await fetchUser(parseInt(params.id));

	return {
		title: issue?.title,
		description: 'Details of issue ' + issue?.id
	};
}

export default IssueDetailPage;
