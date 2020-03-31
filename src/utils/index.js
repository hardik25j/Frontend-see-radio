export function logIn(clientObj) {
	Object.keys(clientObj).map((key) => {
		localStorage.setItem(key, clientObj[key]);
	})
}

export function logOut() {
	localStorage.clear();
}

export function isLogin() {
	if (localStorage.token) {
		return true;
	}
	return false;
}

export function getRoleCode() {
	let roleCode = localStorage.roleCode;
	if (roleCode === 'SRA')
		return 'See Radio Administrator'
	else if (roleCode === 'SOA')
		return 'Sales Organization Administrator'
}
