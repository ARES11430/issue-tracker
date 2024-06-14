'use client';

import 'easymde/dist/easymde.min.css';
import '@/app/custom-simplemde.css';

import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';

const NewIssuePage = () => {
	return (
		<div className='max-w-xl space-y-2'>
			<TextField.Root placeholder='Title' />
			<SimpleMDE placeholder='Description' />
			<Button>Submit New Issue</Button>
		</div>
	);
};

export default NewIssuePage;
