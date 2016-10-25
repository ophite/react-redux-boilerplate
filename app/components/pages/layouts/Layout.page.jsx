import ModalContainer from '../../../containers/modal/Modal.container.jsx';


export default class LayoutPage extends React.Component {

    renderContainerModal() {
        const {
            windowWidth,
            isContainerModalOpen,
            containerModalData,
            handleKeyDown
        } = this.props;

        if (!isContainerModalOpen) {
            return (null);
        }

        return (
            <ModalContainer
                onKeyDown={handleKeyDown}
                windowWidth={windowWidth}
                containerModalData={containerModalData}
            />
        );
    }

    renderModal() {
        const {
            modalData,
            isModalOpen,
        } = this.props;

        if (!isModalOpen) {
            return (null);
        }

        return (
            <Modal
                {...modalData}
                isOpen={true}
            />
        );
    }

    renderContent() {
        const {
            children
        } = this.props;
        const headerStyle = { textAlign: 'center', paddingTop: '15px' };
        // const childrenClone = React.cloneElement(children, { isMobile });

        return (
            <div>
                <div>
                    <div>
                        <h2 style={headerStyle}> Pokemon test</h2>
                    </div>
                </div>
                <hr />
                {children}
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderContainerModal()}
                {this.renderModal()}
                {this.renderContent()}
            </div>
        );
    }
}

LayoutPage.propTypes = {
    children: React.PropTypes.element,
    windowWidth: React.PropTypes.number,
    handleKeyDown: React.PropTypes.func,
    containerModalData: React.PropTypes.object,
    isModalOpen: React.PropTypes.bool,
    isContainerModalOpen: React.PropTypes.bool,
    modalData: React.PropTypes.object
};
