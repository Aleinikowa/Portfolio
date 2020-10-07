import Component from '../component';

import AboutTemplate from '../../../templates/pages/about';

class About extends Component {
    render() {
        return new Promise(resolve => resolve (AboutTemplate()));
    }
}

export default About;