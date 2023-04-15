const saveAccessToken = (accessToken) => {
	localStorage.setItem(
		'accessToken',
		accessToken
	);
};

export default saveAccessToken;
