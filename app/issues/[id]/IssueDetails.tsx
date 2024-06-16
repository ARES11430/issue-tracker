import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Issue } from '@prisma/client';
import { Box, Heading, Flex, Card, Text } from '@radix-ui/themes';
import React from 'react';
import Markdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
	return (
		<>
			<Heading>{issue.title}</Heading>
			<Flex gap='3' my='2'>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toLocaleString()}</Text>
			</Flex>
			<Card>
				<Markdown className='markdown-body'>{issue.description}</Markdown>
			</Card>
		</>
	);
};

export default IssueDetails;
