'use strict';

import { connect } from 'react-redux';
import InfiniteScrollContainer from './InfiniteScroll.container.jsx';


InfiniteScrollContainer.propTypes = {
    next: React.PropTypes.func,
    prev: React.PropTypes.func,
    hasMore: React.PropTypes.bool,
    hasMoreNext: React.PropTypes.bool,
    hasMorePrev: React.PropTypes.bool,
    children: React.PropTypes.node,
    loader: React.PropTypes.node,
    scrollThreshold: React.PropTypes.number,
    style: React.PropTypes.object,
    height: React.PropTypes.number,
    hasChildren: React.PropTypes.bool,
    prevFiredHeight: React.PropTypes.number,
};

const mapStateToProps = (state) => {
    return {
        isContainerModalOpen: state.common.isContainerModalOpen,
    };
};

export default connect(mapStateToProps)(InfiniteScrollContainer);
