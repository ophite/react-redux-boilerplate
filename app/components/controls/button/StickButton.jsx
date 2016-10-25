'use strict';

import BaseButton from './Button.jsx';
import isMobile from '../../../utils/isMobile';


class StickButton extends BaseButton {

    static propTypes = {
        isHideButton: React.PropTypes.bool
    };

    static defaultProps = {
        isHideButton: true
    };

    render() {
        return (
            <div className="footer-modal pressed">
                <div className="sub-wrap">
                    <BaseButton
                        {...this.props}
                    />
                </div>
            </div>
        );
    }
}

export default StickButton;
