'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';

const Navbar = () => {
	const currentPath = usePathname();

	const links = [
		{ lable: 'Dashboard', href: '/' },
		{ lable: 'Issues', href: '/issues' }
	];

	return (
		<nav className='flex space-x-5 mb-3 px-5 border-b h-14 items-center'>
			<Link href='/'>
				<AiFillBug />
			</Link>
			<ul className='flex space-x-5'>
				{links.map((link) => (
					<Link
						className={classNames({
							'text-teal-300': link.href === currentPath,
							'hover:text-teal-300 transition-colors': true
						})}
						key={link.lable}
						href={link.href}
					>
						{link.lable}
					</Link>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
