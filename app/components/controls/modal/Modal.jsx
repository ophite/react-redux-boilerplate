// TODO need add css for full modal window
import React from 'react';
import Modal from 'react-modal';

import Button from '../button/Button.jsx';

const customStyles = {
    content: {
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        display: 'block',
        borderRadius: '6px',
        margin: '0 auto',
        width: '290px',
        height: 'auto',
        position: 'relative',
        verticalAlign: 'middle',
        overflow: 'hidden'
    },
    overlay: {
        backgroundColor: 'rgba(74, 74, 74, 0.8)',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        overflow: 'auto',
        zIndex: 10000,
        padding: '1em 1em 0',
        height: '100%',
        verticalAlign: 'middle'
    }
};


class BaseModal extends React.Component {

    static propTypes = {
        style: React.PropTypes.object,
        isOpen: React.PropTypes.bool,
        onClose: React.PropTypes.func,
        description: React.PropTypes.string,

        leftButtonTitle: React.PropTypes.string,
        leftButtonClassName: React.PropTypes.string,
        leftButtonRoute: React.PropTypes.string,
        leftButtonClick: React.PropTypes.func,

        rightButtonTitle: React.PropTypes.string,
        rightButtonClassName: React.PropTypes.string,
        rightButtonRoute: React.PropTypes.string,
        rightButtonClick: React.PropTypes.func,

        footerButtonTitle: React.PropTypes.string,
        footerButtonClassName: React.PropTypes.string,
        footerButtonRoute: React.PropTypes.string,
        footerButtonClick: React.PropTypes.func
    };

    leftButtonClick = () => {
        this.props.leftButtonClick();
        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    rightButtonClick = () => {
        this.props.rightButtonClick();
        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    footerButtonClick = () => {
        this.props.footerButtonClick();
        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    render() {
        const {
            style,
            isOpen,
            onClose,
            description,

            leftButtonTitle,
            leftButtonClassName,
            leftButtonRoute,
            leftButtonClick,

            rightButtonTitle,
            rightButtonClassName,
            rightButtonRoute,
            rightButtonClick,

            footerButtonTitle,
            footerButtonClassName,
            footerButtonRoute,
            footerButtonClick

        } = this.props;

        const mergedStyles = Object.assign({}, customStyles, style);

        const leftButtonClickCallBack = leftButtonClick ? this.leftButtonClick : null;
        const rightButtonClickCallBack = rightButtonClick ? this.rightButtonClick : null;
        const footerButtonClickCallBack = footerButtonClick ? this.footerButtonClick : null;

        const leftButtonClassNameWrap = leftButtonClassName ? leftButtonClassName : "button-cancel";
        const rightButtonClassNameWrap = rightButtonClassName ? rightButtonClassName : "button-primary";
        const footerButtonClassNameWrap = footerButtonClassName ? footerButtonClassName : "btn-remove";

        return (
            <Modal
                isOpen={isOpen}
                style={mergedStyles}
                closeTimeoutMS={300}
                onRequestClose={onClose}
            >
                <div className="container-modal">
                    <div className='content'>
                        {description}
                    </div>
                    <div className='footer-bar'>
                        <div className="button-group">
                            <div className="item">
                                <Button
                                    className={leftButtonClassNameWrap}
                                    text={leftButtonTitle}
                                    route={leftButtonRoute}
                                    onClick={leftButtonClickCallBack}>
                                </Button>
                            </div>
                            <div className="item">
                                <Button
                                    className={rightButtonClassNameWrap}
                                    text={rightButtonTitle}
                                    route={rightButtonRoute}
                                    onClick={rightButtonClickCallBack}>
                                </Button>
                            </div>
                        </div>

                        {
                            footerButtonTitle ?
                                (
                                    <div className="footer-button">
                                        <Button
                                            className={footerButtonClassNameWrap}
                                            text={footerButtonTitle}
                                            route={footerButtonRoute}
                                            onClick={footerButtonClickCallBack}>
                                        </Button>
                                    </div>
                                ) : ( null)
                        }
                    </div>
                </div>
            </Modal>
        );
    }
}

export default BaseModal;
