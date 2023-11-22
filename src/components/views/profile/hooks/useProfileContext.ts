import { useContext } from 'react';
import { ProfileContext } from '../provider/provider';

const useProfileContext = () => {
	const _profileContext = useContext(ProfileContext);

	if (!_profileContext) {
		throw new Error(
			'useProfileContext has to be used within <ProfileContext.Provider>'
		);
	}

	return _profileContext;
};

export default useProfileContext;
