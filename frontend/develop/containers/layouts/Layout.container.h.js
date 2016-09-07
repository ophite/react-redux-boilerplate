import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeModal } from '../../actions/modal.actions';

import LayoutContainer from './Layout.container.jsx';

LayoutContainer.propTypes = {
    isModalOpen: PropTypes.bool,
    handleCloseModal: PropTypes.func
};

const mapStateToProps = (state) => ({
    isModalOpen: state.common.isModalOpen
});

const mapDispatchToProps = (dispatch) => ({
    handleCloseModal: bindActionCreators(closeModal, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
