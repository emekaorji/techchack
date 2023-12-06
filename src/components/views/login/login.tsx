import Head from 'next/head';
import styles from './login.module.css';
import { signIn } from 'next-auth/react';
import GithubIcon from '@/components/interface/icons/github';
import { useState } from 'react';
import LoaderIcon from '@/components/interface/icons/loader';

const Login = () => {
	const [loading, setLoading] = useState(false);

	return (
		<>
			<Head>
				<title>TechChack | Login</title>
				<meta
					name='description'
					content='Share your tech stack with the world'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.container}>
				<h1>TechChack</h1>
				<button
					onClick={() => {
						setLoading(true);
						signIn('github', { callbackUrl: '/profile', redirect: false });
					}}>
					<span className={styles.icon}>
						{loading ? <LoaderIcon /> : <GithubIcon />}
					</span>{' '}
					Login with Github
				</button>
			</div>
		</>
	);
};

export default Login;
