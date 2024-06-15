'use client';

import 'easymde/dist/easymde.min.css';
import '@/app/custom-simplemde.css';

import axios from 'axios';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueInput {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const { register, control, handleSubmit } = useForm<IssueInput>();

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
				<Controller
					name='description'
					control={control}
					render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
				/>

				<Button>Submit New Issue</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
