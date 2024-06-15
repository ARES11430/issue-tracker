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

	const [error, setError] = useState<String>('');

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
						await axios.post('/api/issues', data);
						router.push('/issues');
					} catch (error) {
						setError('An unexpected error has occured');
					}
				})}
			>
				<TextField.Root placeholder='Title' {...register('title')} />
				{errors.title && (
					<Text color='red' as='p'>
						{errors.title.message}
					</Text>
				)}
				<Controller
					name='description'
					control={control}
					render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
				/>
				{errors.description && (
					<Text color='red' as='p'>
						{errors.description.message}
					</Text>
				)}
				<Button>Submit New Issue</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
