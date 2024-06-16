import prisma from '@/prisma/db';
import { notFound } from 'next/navigation';

import dynamic from 'next/dynamic';
import Loading from '@/app/loading';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
	ssr: false,
	loading: () => <Loading />
});

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

	return <IssueForm issue={issue} />;
};

export default EditIssuePage;
