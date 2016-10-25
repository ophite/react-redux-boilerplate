'use strict';

import isMobile from '../../../utils/isMobile';


class InfiniteScrollComponent extends React.Component {

    static propTypes = {
        isContainerModalOpen: React.PropTypes.bool,
        hasMore: React.PropTypes.bool,
        isShowLoader: React.PropTypes.bool,
        children: React.PropTypes.node,
        loader: React.PropTypes.node,
        height: React.PropTypes.number,
        next: React.PropTypes.func
    };

    renderButtonShowNext = () => {
        const { hasMore, next, isContainerModalOpen } = this.props;
        if (!hasMore || !isContainerModalOpen || isMobile) {
            return null;
        }

        return (
            <div className="see-all" onClick={next}>
				<span>
					show more ...
				</span>
                <i className="icon-shevron-down"/>
            </div>
        );
    };

    render() {
        const { isShowLoader, children, loader, height } = this.props;
        const style = {
            height: height || 'auto',
            overflowY: 'auto'
        };

        return (
            <div
                id='inf-scroll'
                ref='infScroll'
                className='infinite-scroll-component'
                style={style}
            >
                { children }
                { isShowLoader ? loader : null }
                {this.renderButtonShowNext()}
            </div>
        );
    }
}

export default InfiniteScrollComponent;
