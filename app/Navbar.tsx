'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession, signIn, signOut } from 'next-auth/react';
import Spinner from './components/Spinner';

const Navbar = () => {
	return (
		<nav className='border-b mb-5 px-5 py-3'>
			<Container>
				<Flex justify='between'>
					<Flex align='center' gap='3'>
						<Link href='/'>
							<AiFillBug />
						</Link>
						<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

const NavLinks = () => {
	const currentPath = usePathname();

	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' }
	];

	return (
		<ul className='flex space-x-6'>
			{links.map((link) => (
				<li key={link.href}>
					<Link
						className={classNames({
							'nav-link': true,
							'!text-teal-500': link.href === currentPath
						})}
						href={link.href}
					>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

const AuthStatus = () => {
	const { status, data: session } = useSession();

	const handleSignIn = () => {
		signIn(undefined, { callbackUrl: '/' });
	};

	const handleSignOut = () => {
		signOut({ callbackUrl: '/' });
	};

	if (status === 'loading') return <Spinner />;

	if (status === 'unauthenticated')
		return (
			<button onClick={handleSignIn} className='ml-5'>
				Login
			</button>
		);

	return (
		<Box>
			{session && <Text className='mr-3'>{session.user?.name}</Text>}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						src={session!.user!.image!}
						fallback='?'
						size='2'
						radius='full'
						className='cursor-pointer'
						referrerPolicy='no-referrer'
					/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size='2'>{session!.user!.email}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item>
						<button onClick={handleSignOut} className='ml-5'>
							Sign Out
						</button>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};

export default Navbar;
