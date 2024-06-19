import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@radix-ui/themes/styles.css';
import './theme-config.css';

import { Container, Theme } from '@radix-ui/themes';
import Navbar from './Navbar';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter'
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.variable}>
				<Theme
					appearance='dark'
					accentColor='lime'
					grayColor='slate'
					panelBackground='solid'
					radius='small'
				>
					<Navbar />
					<main className='p-5'>
						<Container>{children}</Container>
					</main>
				</Theme>
			</body>
		</html>
	);
}
