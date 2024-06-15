'use client';

import 'easymde/dist/easymde.min.css';
import '@/app/custom-simplemde.css';

import axios from 'axios';
import { Button, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { useRouter } from 'next/navigation';

interface IssueInput {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const { register, control, handleSubmit } = useForm<IssueInput>();

	const router = useRouter();

	return (
		<form
			className='max-w-xl space-y-2'
			onSubmit={handleSubmit(async (data) => {
				await axios.post('/api/issues', data);
				router.push('/issues');
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
	);
};

export default NewIssuePage;
