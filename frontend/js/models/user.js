class User {
    addUserData(newUser) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/login');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify(newUser));
		});
	}
	getUsersData() {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/api/users');

			xhr.onload = () =>  {
				try {
					resolve(JSON.parse(xhr.response));
				} catch (err) {
					/* eslint-disable no-console */
					console.log('database is empty');
				}
			};
			xhr.send();
		});
	}
	getUserData(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:3000/api/login/portfolio/${id}`);

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}
    editUser(newData) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', `http://localhost:3000/api/login/resume/${newData}`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(newData));
        });
    }
	getInfoUser(user) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/login/portfolio');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onload = () => {
				if (xhr.status >= 400) {
					reject(xhr.response);
				} else {
					resolve(JSON.parse(xhr.response));
				}
			};

			xhr.onerror = () => reject(xhr.response);

			xhr.send(JSON.stringify(user));
		});
    }
	sendEmail(resume) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/login/resume/:id');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify(resume));
		});
	}
}

export default User;

