import prisma from '@/prisma/db';
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';

const IssuesPage = async () => {
	const issues = await prisma.issue.findMany();

	return (
		<div>
			<div className='mb-3'>
				<Button>
					<Link href='/issues/new'>New Issue</Link>
				</Button>
			</div>
			<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>
							Created At
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>{issue.id}</Table.Cell>
							<Table.Cell>
								{issue.title}
								<div className='block md:hidden'>{issue.status}</div>
							</Table.Cell>
							<Table.Cell className='hidden md:table-cell'>{issue.status}</Table.Cell>
							<Table.Cell className='hidden md:table-cell'>
								{new Date(issue.createdAt).toLocaleDateString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default IssuesPage;
