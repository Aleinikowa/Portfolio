import Component from '../../component';

import User from '../../../models/user';

import AddUsersTemplate from '../../../../templates/pages/resume/users';

class Users extends Component {
	constructor() {
		super();
		this.model = new User();
	}
	getData() {
        return new Promise(resolve => this.model.getUsersData().then(users => resolve(users)));
	}
	render(users) {
		return new Promise(resolve => resolve (AddUsersTemplate({users})));
    }
}

export default Users;