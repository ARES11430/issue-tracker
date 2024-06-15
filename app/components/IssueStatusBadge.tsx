import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

interface Props {
	status: Status;
}

type color = 'red' | 'orange' | 'green';

const statusMap: Record<Status, { lable: string; color: color }> = {
	OPEN: { lable: 'open', color: 'red' },
	IN_PROGRESS: { lable: 'in progress', color: 'orange' },
	CLOSED: { lable: 'closed', color: 'green' }
};

const IssueStatusBadge = ({ status }: Props) => {
	return <Badge color={statusMap[status].color}>{statusMap[status].lable}</Badge>;
};

export default IssueStatusBadge;
