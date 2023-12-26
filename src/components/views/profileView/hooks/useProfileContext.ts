import { useContext } from 'react';
import { ProfileViewContext } from '../provider/provider';

const useProfileContext = () => {
	const _profileViewContext = useContext(ProfileViewContext);

	if (!_profileViewContext) {
		throw new Error(
			'useProfileContext has to be used within <ProfileViewContext.Provider>'
		);
	}

	return _profileViewContext;
};

export default useProfileContext;
