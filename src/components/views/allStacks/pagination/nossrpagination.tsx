import dynamic from 'next/dynamic';

const Pagination = dynamic(() => import('./pagination'), {
	ssr: false,
});

export default Pagination;
