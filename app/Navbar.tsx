'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import { Box, Container, Flex } from '@radix-ui/themes';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
	const currentPath = usePathname();
	const { status, data: session } = useSession();

	const links = [
		{ lable: 'Dashboard', href: '/' },
		{ lable: 'Issues', href: '/issues' }
	];

	const handleSignIn = () => {
		signIn(undefined, { callbackUrl: '/' });
	};

	const handleSignOut = () => {
		signOut({ callbackUrl: '/' });
	};

	return (
		<nav className='border-b mb-5 px-5 py-3'>
			<Container>
				<Flex justify='between'>
					<Flex gap='3' align='center'>
						<Link href='/'>
							<AiFillBug />
						</Link>
						<ul className='flex space-x-5'>
							{links.map((link) => (
								<li key={link.lable}>
									<Link
										className={classNames({
											'text-teal-500': link.href === currentPath,
											'hover:text-teal-500 transition-colors': true
										})}
										href={link.href}
									>
										{link.lable}
									</Link>
								</li>
							))}
						</ul>
					</Flex>
					<Box>
						{status === 'authenticated' && (
							<Box className='flex space-x-5'>
								<span>{session.user!.name}</span>
								<button onClick={handleSignOut} className='ml-5'>
									Sign Out
								</button>
							</Box>
						)}
						{status === 'unauthenticated' && (
							<button onClick={handleSignIn} className='ml-5'>
								Login
							</button>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	);
};

export default Navbar;
