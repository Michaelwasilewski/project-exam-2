function clearStorage() {
	localStorage.clear();
}

const updateLocalStorage = async (url) => {
	try {
		const accessToken = localStorage.getItem(
			'accessToken'
		);
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem(
				'user',
				JSON.stringify(data)
			);
			window.location.href = '/profile';
		} else {
			console.log('There was an error');
		}
	} catch (error) {
		console.error(error);
	}
};
export { updateLocalStorage, clearStorage };
