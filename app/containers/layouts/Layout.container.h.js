import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LayoutContainer from './Layout.container.jsx';
import { closeModal } from '../../actions/modal.actions';


LayoutContainer.propTypes = {
    isModalOpen: React.PropTypes.bool,
    handleCloseModal: React.PropTypes.func,
};

const mapStateToProps = (state) => ({
    isModalOpen: state.common.isModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
    handleCloseModal: bindActionCreators(closeModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
