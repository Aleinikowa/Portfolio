import User from '../../../models/user';

import Component from '../../component';

import EveryTemplate from '../../../../templates/pages/resume/every';

class Every extends Component {
    constructor() {
        super();
        this.model = new User();
    }
    getData() {
        return new Promise(resolve => this.model.getUserData(this.request.id).then(user => resolve(user)));
	}
    render(user) {
        return new Promise(resolve => resolve(EveryTemplate({
            cover : user.cover,
            avatar : user.avatar,
            firstName : user.firstNameUser,
            lastName : user.lastNameUser,
            from : user.fromUser,
            nationality : user.nationalityUser,
            performance : user.performanceUser,
            age : user.ageUser,
            email : user.email,
            photo1 : user.photo1,
            photo2 : user.photo2,
            photo3 : user.photo3,
            photo4 : user.photo4,
            video : user.videoBlock
        })));
    }
}

export default Every;