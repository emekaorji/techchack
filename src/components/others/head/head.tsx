import NextHead from 'next/head';

interface HeadProps {
	description: string;
	iconHref?: string;
	title: string;
}

const Head = ({ description, iconHref = '/favicon.ico', title }: HeadProps) => {
	return (
		<>
			<NextHead>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href={iconHref} />
			</NextHead>
		</>
	);
};

export default Head;
