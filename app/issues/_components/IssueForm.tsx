'use client';

import 'easymde/dist/easymde.min.css';
import '@/app/custom-simplemde.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { issueSchema } from '@/app/validation/validationSchemas';

// * components
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
	issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema)
	});

	const router = useRouter();

	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitting(true);
			if (issue) await axios.patch('/api/issues/' + issue.id, data);
			else await axios.post('/api/issues', data);
			router.replace('/issues');
		} catch (error) {
			setError('An unexpected error has occured');
			setIsSubmitting(false);
		}
	});

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-2'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className='space-y-2' onSubmit={onSubmit}>
				<TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')} />
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name='description'
					control={control}
					defaultValue={issue?.description}
					render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					{issue ? 'Edit Issue' : 'Submit new Issue'} {isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
