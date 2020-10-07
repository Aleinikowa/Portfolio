import {parseRequestURL} from './helpers/utils';

import Header from './views/partials/header';
import Footer from './views/partials/footer';

import About from './views/pages/about';
import Error404 from './views/pages/error404';

import Login from './views/pages/resume/login';
import Portfolio from './views/pages/resume/portfolio';
import Users from './views/pages/resume/users';
import Info from './views/pages/resume/info';
import Every from './views/pages/resume/every';
import Agent from './views/pages/resume/agent';
import AgentUser from './views/pages/resume/agentUser';

const Routes = {
    '/': About,
    '/login/portfolio': Portfolio,
    '/users': Users,
    '/login/resume/:id': Info,
    '/users/view/:id': Every,
    '/login': Login,
    '/agent': Agent,
    '/agent/user/:id': AgentUser
};

function router() {
    const headerContainer = document.getElementsByClassName('header-container')[0],
    contentContainer = document.getElementsByClassName('content-container')[0],
    footerContainer = document.getElementsByClassName('footer-container')[0],
    header = new Header(),
    footer = new Footer();

    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.action ? `/${request.action}` : ''}${request.id ? '/:id' : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
        page.render(data).then(html => {
            contentContainer.innerHTML = html;
            page.afterRender();
        });
    });

    if (parsedURL == '/' || parsedURL == '/login' || parsedURL == '/agent' || parsedURL == '/agent/user/:id') {
        header.noHeader().then(html => headerContainer.innerHTML = html);
        footer.noFooter().then(html => footerContainer.innerHTML = html);
    } else {
        header.render().then(html => headerContainer.innerHTML = html);
        footer.render().then(html => footerContainer.innerHTML = html);
    }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);