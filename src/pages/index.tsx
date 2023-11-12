export async function getServerSideProps() {
	return {
		redirect: {
			permanent: false,
			destination: `/profile`,
		},
	};
}

export default function HomePage() {
	return '';
}
