import { Box, Heading, Text } from '@radix-ui/themes';
import LoadingSpinner from './components/LoadingSpinner';

const loading = () => {
	return (
		<Box className='text-center mt-40 space-y-10'>
			<Heading className='text-teal-500'>Loading...</Heading>
			<Box>
				<LoadingSpinner />
			</Box>
			<Box>
				<Text className='font-bold size-xl'>Hopefully not for too long :)</Text>
			</Box>
		</Box>
	);
};

export default loading;
