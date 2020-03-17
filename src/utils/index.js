export const logIn = (clientObj) => {
	Object.keys(clientObj).map((key) => {
		localStorage.setItem(key, clientObj[key]);
	})
}

export const logOut = () => {
	localStorage.clear();
}

export const isLogin = () => {
	if (localStorage.token) {
		return true;
	}
	return false;
}

export const getRoleCode = () => {
	let roleCode = localStorage.roleCode;
	if (roleCode === 'SRA')
		return 'See Radio Administrator'
	else if (roleCode === 'SOA')
		return 'Sales Organization Administrator'
}
