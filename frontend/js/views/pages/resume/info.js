import User from '../../../models/user';

import Component from '../../component';

import {urlID} from '../../../helpers/utils.js';

import InfoTemplate from '../../../../templates/pages/resume/info';

class Info extends Component {
    constructor() {
        super();
        this.model = new User();
    }
    getData() {
        return new Promise(resolve => this.model.getUserData(this.request.id).then(user => resolve(user)));
	}
    render(user) {
        return new Promise(resolve => resolve(InfoTemplate({
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
    afterRender() {
        this.setActions();
        this.saveScroll();
    }
    setActions() {
        let btnCoverAdd = document.getElementById('coverJS'),
            blockModalCover = document.getElementById('coverModalJS'),
            btnCoverClose = document.getElementById('coverCloseJS'),
            inputCover = document.getElementById('inputCoverJS'),
            addURLCover = document.getElementById('addURLCoverJS'),
            coverPicture = document.getElementsByClassName('cover__img-picture')[0],
            blockModalAvatar = document.getElementById('avatarModalJS'),
            inputAvatar = document.getElementById('urlPhotoJS'),
            btnAvatarClose = document.getElementById('avatarCloseJS'),
            avatarAdd = document.getElementById('avatarAddJS'),
            blockImg = document.getElementById('blockImg'),
            blockImgAvatar = document.getElementById('fullNameJS'),
            imgAvatar = document.getElementById('imgAvatarJS'),
            photo1 = document.getElementById('photo1'),
            photo2 = document.getElementById('photo2'),
            photo3 = document.getElementById('photo3'),
            photo4 = document.getElementById('photo4'),
            videoText = document.getElementsByClassName('video')[0],
            btnNoneVideoText = document.getElementById('noneText'),
            btnAddVideo = document.getElementById('btnAddVideoJS'),
            inputVideo = document.getElementById('inputAddVideoJS'),
            textarea = document.getElementById('noteJS'),
            emailAgent = document.getElementById('emailAgentJS'),
            btnSendResume = document.getElementById('sendResumeJS');

        btnCoverAdd.addEventListener('click', () => this.showModal(blockModalCover));
        btnCoverClose.addEventListener('click', () => this.closeModal(blockModalCover));
        btnAvatarClose.addEventListener('click', () =>this.closeModal(blockModalAvatar));
        addURLCover.addEventListener('click', () => this.changeCover(inputCover, blockModalCover));
        avatarAdd.addEventListener('click', () => this.changeAvatar(inputAvatar, blockModalAvatar));
        photo1.addEventListener('blur', () => this.addPhoto(photo1));
        photo2.addEventListener('blur', () => this.addPhoto(photo2));
        photo3.addEventListener('blur', () => this.addPhoto(photo3));
        photo4.addEventListener('blur', () => this.addPhoto(photo4));
        btnAddVideo.addEventListener('click', () => this.addVideo(inputVideo, videoText));
        btnNoneVideoText.addEventListener('click', () => this.noneVideoText(videoText, btnNoneVideoText));
        emailAgent.addEventListener('blur', () => this.validationEmail(emailAgent));
        btnSendResume.addEventListener('click', () => this.sendResume(emailAgent, textarea));

        window.onclick = (event) => {
            event.stopImmediatePropagation();
            if (event.target == blockImg || event.target == coverPicture) {
                // blockModalCover.style.display = 'none';
                // blockModalAvatar.style.display = 'none';
                blockModalCover.classList.add('none');
                blockModalAvatar.classList.add('none');
            }
            if (event.target == imgAvatar) {
                // blockModalAvatar.style.display = 'block';
                blockModalAvatar.classList.toggle('none');
            }
        };
    }
    saveScroll() {
        window.scrollTo(0, +localStorage.getItem('page_scroll'));
        document.addEventListener('scroll', function() {
            localStorage.setItem('page_scroll', window.pageYOffset);
        });
    }
    showModal(block) {
        // block.style.display = 'block';
        block.classList.toggle('none');
    }
    closeModal(block) {
        // block.style.display = 'none';
        block.classList.toggle('none');
    }
    changeCover(input, modalCover) {
        const idUser = urlID();

        let url = input.value,
            newURL = this.pathСhange(url);
        this.closeModal(modalCover);
        return new Promise(() => this.model.editUser({id: idUser, cover : newURL}).then(() => setTimeout(() => (document.location.reload()), 200)));
    }
    changeAvatar(input, modalCover) {
        const idUser = urlID();

        let url = input.value,
            newURL = this.pathСhange(url);
        this.closeModal(modalCover);
        return new Promise(() => this.model.editUser({id: idUser, avatar : newURL}).then(() => setTimeout(() => (document.location.reload()), 200)));
    }
    addPhoto(input) {
        const idUser = urlID();

        let url = input.value,
            counter = input.dataset.counter,
            newURL = this.pathСhange(url),
            key = `photo${counter}`;

        return new Promise(() => this.model.editUser({id: idUser, [key] : newURL}).then(() => setTimeout(() => (document.location.reload()), 200)));
    }
    pathСhange(url) {
        let urlPhoto = url.replace('https://drive.google.com/file/d/','https://drive.google.com/uc?export=view&id=');
        let urlFinish = urlPhoto.split('/view')[0];
        return urlFinish;
    }
    addVideo(input) {
        const idUser = urlID();

        let linkVideo = input.value,
            link = linkVideo.replace('watch?v=', 'embed/'),
            newLink = link.split('&')[0];

        return new Promise(() => this.model.editUser({id: idUser, video : newLink}).then(() => {
            setTimeout(() => (document.location.reload()), 300);
        }));
    }
    noneVideoText(block,btn) {
        btn.classList.toggle('rotate');
        block.classList.toggle('none');
    }
    validationEmail(input) {
        if (!(/^[a-z]{1,20}(-\d{4})?@[a-z\d]{1,10}[-.]?[a-z\d]{1,10}\.com$/i.test(input.value))) {
            input.value = '';
            input.classList.add('input-err');
            setInterval(() => input.classList.remove('input-err'), 2000);
        }
    }
    sendResume(emailAgent, textarea) {
        let linkUser =  window.location.href,
            link = linkUser.replace('/login/resume/', '/agent/user/');

        const agent = {agentEmail : emailAgent.value, text : link, userNote : textarea.value};
        this.model.sendEmail(agent).then(() => this.showMessage(emailAgent, textarea));
    }
    showMessage(emailAgent, textarea) {
        emailAgent.value = '';
        textarea.value = '';
        textarea.classList.add('port__send-suc');
        textarea.setAttribute('placeholder', 'Your resume has been sent successfully');

        setTimeout(() => {
            textarea.classList.remove('port__send-suc');
            textarea.setAttribute('placeholder', '');
        }, 2000);
    }
}

export default Info;
