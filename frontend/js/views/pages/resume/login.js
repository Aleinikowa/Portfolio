import Component from '../../component';

import User from '../../../models/user';

import LoginTemplate from '../../../../templates/pages/resume/login';

class Login extends Component {
    constructor() {
		super();
        this.model = new User();
    }
    render() {
        return new Promise(resolve => resolve (LoginTemplate()));
    }
    afterRender() {
        this.setActions();
    }
    setActions() {
        let firstName = document.getElementById('firstNameJS'),
            lastName = document.getElementById('lastNameJS'),
            fromUserCity = document.getElementById('fromInputJS'),
            nationality = document.getElementById('nationalityJS'),
            performance = document.getElementById('performanceJS'),
            age = document.getElementById('ageJS'),
            emailUser = document.getElementById('emailJS'),
            createBtn = document.getElementById('signJS');

        firstName.addEventListener('blur', () => this.validationLetters(firstName));
        lastName.addEventListener('blur', () => this.validationLetters(lastName));
        fromUserCity.addEventListener('blur', () => this.validationLetters(fromUserCity));
        nationality.addEventListener('blur', () => this.validationLetters(nationality));
        performance.addEventListener('blur', () => this.validationLetters(performance));
        age.addEventListener('blur', () => this.validationNumbers(age));
        emailUser.addEventListener('blur', () => this.validationEmail(emailUser));
        createBtn.addEventListener('click', () => this.addUser(firstName,lastName,fromUserCity,nationality,performance,age,emailUser));
    }
    addUser(firstName,lastName,fromUserCity,nationality,performance,age,emailUser) {
        let idUser = Math.random().toString(36).substr(2, 10),
            srcCover = '../../../../images/profile/11.jpg',
            srcAvatar = '../../../../images/profile/22.jpg',
            photoUser = './../../../images/profile/portfolio/10.jpg',
            video = 'https://www.youtube.com/embed/-5KAN9_CzSA';

        const dataUser =  {
            firstNameUser : firstName.value,
            lastNameUser : lastName.value,
            fromUser : fromUserCity.value,
            nationalityUser : nationality.value,
            performanceUser : performance.value,
            ageUser : age.value,
            email : emailUser.value,
            id : idUser,
            cover : srcCover,
            avatar : srcAvatar,
            photo1 : photoUser,
            photo2 : photoUser,
            photo3 : photoUser,
            photo4 : photoUser,
            videoBlock : video
        };

        this.model.addUserData(dataUser);
    }
    validationLetters(input) {
        if  (!(/[a-z]/i.test(input.value))) {
            input.value = '';
            input.classList.add('input-err');
            setInterval(() => input.classList.remove('input-err'), 1000);
        }
    }
    validationNumbers(input) {
        if  (!(/[0-9]/i.test(input.value))) {
            input.value = '';
            input.classList.add('input-err');
            setInterval(() => input.classList.remove('input-err'), 1000);
        }
    }
    validationEmail(input) {
        if (!(/^[a-z]{1,10}(-\d{4})?@[a-z\d]{1,10}[-.]?[a-z\d]{1,10}\.com$/i.test(input.value))) {
            input.value = '';
            input.classList.add('input-err');
            setInterval(() => input.classList.remove('input-err'), 1000);
        }
    }
}

export default Login;