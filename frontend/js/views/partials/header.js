import Component from '../../views/component';

import User from '../../models/user';

import HeaderTemplate from '../../../templates/partials/header';

class Header extends Component {
    constructor() {
        super();
		this.model = new User();
    }
    render() {
        const resource = this.request.action,
            res = this.request.resource;

        return new Promise(resolve => resolve(HeaderTemplate({
            isResumePage: (resource === 'resume'),
            isPortfolioPage: (resource === 'portfolio'),
            isUsersPage: (res === 'users'),
            activ: this.activeUser()
        })));
    }
    noHeader() {
        return new Promise(resolve => {
            resolve ('');
        });
    }
    activeUser() {
        return  localStorage.getItem('active');
    }
}

export default Header;