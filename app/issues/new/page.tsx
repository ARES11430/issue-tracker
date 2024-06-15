'use client';

import 'easymde/dist/easymde.min.css';
import '@/app/custom-simplemde.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { createIssueSchema } from '@/app/validation/validationSchemas';

// * components
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema)
	});

	const router = useRouter();

	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-2'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form
				className='space-y-2'
				onSubmit={handleSubmit(async (data) => {
					try {
						setIsSubmitting(true);
						await axios.post('/api/issues', data);
						router.push('/issues');
					} catch (error) {
						setError('An unexpected error has occured');
						setIsSubmitting(false);
					}
				})}
			>
				<TextField.Root placeholder='Title' {...register('title')} />
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name='description'
					control={control}
					render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					Submit New Issue
					{isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
