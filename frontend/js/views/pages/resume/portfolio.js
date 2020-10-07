import Component from '../../component';

import User from '../../../models/user';

import Header from '../../partials/header';

import PortfolioTemplate from '../../../../templates/pages/resume/portfolio';

class Portfolio extends Component {
    constructor() {
        super();
        this.model = new User();
        this.header = new Header;
    }
    render() {
        return new Promise(resolve => resolve (PortfolioTemplate()));
    }
    afterRender() {
        this.setActions();
    }
    setActions() {
        const btnShow = document.getElementById('showJS'),
            inputEmail = document.getElementById('emailUserJS');

        btnShow.addEventListener('click', ()=> this.showUserPortfolio(inputEmail));
    }
    showUserPortfolio(inputEmail) {
        const user = {'email' : inputEmail.value};

        this.model.getInfoUser(user).then(user => {
            this.redirectToPortfolio(user.id);
            localStorage.setItem('active', user.id);
        }).catch(() => this.showError(inputEmail));
    }
    showError(inputEmail) {
        inputEmail.classList.add('portfolio__content-err');
        inputEmail.value = '';
        inputEmail.setAttribute('placeholder', 'invalid email address');

        setTimeout(() => {
            inputEmail.classList.remove('portfolio__content-err');
            inputEmail.setAttribute('placeholder', 'alexruncki@gmail.com');
        }, 2000);
    }
    redirectToPortfolio(id) {
        location.hash = `/login/resume/${id}`;
    }
}

export default Portfolio;