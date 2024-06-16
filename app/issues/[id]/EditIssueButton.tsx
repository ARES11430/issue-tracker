import { Button } from '@radix-ui/themes/dist/cjs/components/index.js';
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
	return (
		<Button>
			<Pencil2Icon />
			<Link href={`/issues/${issueId}/edit`}>Update Issue</Link>
		</Button>
	);
};

export default EditIssueButton;
