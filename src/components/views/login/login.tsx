import Head from 'next/head';
import styles from './login.module.css';

const Login = () => {
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
			<h1>Login</h1>
			<form>
				<input type='text' />
			</form>
		</>
	);
};

export default Login;
