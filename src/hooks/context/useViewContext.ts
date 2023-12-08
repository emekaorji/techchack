import { useContext } from 'react';
import { ViewContext } from '@/providers/viewProvider';

const useViewContext = () => {
	const _viewContext = useContext(ViewContext);

	if (!_viewContext) {
		throw new Error(
			'useViewContext has to be used within <ViewContext.Provider>'
		);
	}

	return _viewContext;
};

export default useViewContext;
