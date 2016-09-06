import React, {Component, PropTypes} from 'react';
import Containers from '../../constants/containers.constant';

class ModalContainer extends Component {

	getContainer(key) {
		return Containers[ key ];
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
	onKeyDown: PropTypes.func,
	windowWidth: PropTypes.number,
	containerModalData: PropTypes.object
};

export default ModalContainer;
