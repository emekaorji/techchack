import { useContext } from 'react';
import { ModalContext } from '@/providers/modalProvider';

const useModalContext = () => {
	const _modalContext = useContext(ModalContext);

	if (!_modalContext) {
		throw new Error(
			'useModalContext has to be used within <ModalContext.Provider>'
		);
	}

	return _modalContext;
};

export default useModalContext;
