'use strict';
import img_404 from '../../../assets/svg/404.svg';


class NotFoundPage extends React.Component {

    render() {
        return (
            <div>
                <img alt="Error code: 404" src={img_404}/>
                <div>Error code: 404</div>
            </div>
        );
    }
}


export default NotFoundPage;
