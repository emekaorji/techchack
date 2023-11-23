export const getServerSideProps = async () => {
	return {
		redirect: {
			permanent: false,
			destination: `/profile`,
		},
	};
};

export default function HomePage() {
	return '';
}
