import { useContext } from 'react';
import { ProfileViewContext } from '../provider/provider';

const useProfileViewContext = () => {
	const _profileViewContext = useContext(ProfileViewContext);

	if (!_profileViewContext) {
		throw new Error(
			'useProfileViewContext has to be used within <ProfileViewContext.Provider>'
		);
	}

	return _profileViewContext;
};

export default useProfileViewContext;
