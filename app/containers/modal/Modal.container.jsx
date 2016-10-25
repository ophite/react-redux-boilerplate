import Containers from '../../constants/containers.constant';


class ModalContainer extends React.Component {

    getContainer(key) {
        return Containers[key];
    }

    render() {
        const { containerModalData: { type, ...args }, windowWidth } = this.props;
        const { component, className } = this.getContainer(type);

        const container = React.cloneElement(component, { ...args, windowWidth });

        return (
            <div className={className}>
                <div className="container-modal" onClick={e => e.stopPropagation()}>
                    {container}
                </div>
            </div>
        );
    }
}

ModalContainer.propTypes = {
    onKeyDown: React.PropTypes.func,
    windowWidth: React.PropTypes.number,
    containerModalData: React.PropTypes.object
};

export default ModalContainer;
