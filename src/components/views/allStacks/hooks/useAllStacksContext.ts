import { useContext } from 'react';
import { AllStacksContext } from '../provider/provider';

const useAllStacksContext = () => {
	const _allStacksContext = useContext(AllStacksContext);

	if (!_allStacksContext) {
		throw new Error(
			'useAllStacksContext has to be used within <AllStacksContext.Provider>'
		);
	}

	return _allStacksContext;
};

export default useAllStacksContext;
