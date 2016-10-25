'use strict';

import { connect } from 'react-redux';

import InfiniteScrollComponent from './InfiniteScroll.component.jsx';
import isMobile from '../../../utils/isMobile';
import { isScrollbarVisible, debounce } from './helper';


class InfiniteScroll extends React.Component {
    
    static defaultProps = {
        prevFiredHeight: 40
    };
    
    static propTypes = {
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
        prevFiredHeight: React.PropTypes.number
    };
    
    constructor(props) {
        super(props);
        this.state = {
            showPrev: false,
            showLoader: false,
            lastScrollTop: 0,
            actionTriggered: false
        };
        this.onScrollListener = this.onScrollListener.bind(this);
        this.debouncedOnScrollListener = debounce(this.onScrollListener, 150).bind(this);
    }
    
    componentDidMount() {
        // todo: Add "self" props for determine global or local container scrolling
        const { self, height } = this.props;
        
        // (bpo): Use '#app-view' container instead of window
        
        this.el = !height
            ? window//document.getElementById('app-view')
            : document.getElementById('inf-scroll');
        
        this.el.addEventListener('scroll', this.debouncedOnScrollListener);
        this.loadDataTwiceWhenNoScroll();
    }
    
    componentWillUnmount() {
        this.el.removeEventListener('scroll', this.debouncedOnScrollListener);
    }
    
    componentWillReceiveProps(props) {
        // new data was sent in
        this.setState({
            showLoader: false,
            actionTriggered: false
        });
    }
    
    /************** private methods **************/
    
    loadDataTwiceWhenNoScroll = () => {
        const {
            next,
            hasMore,
            hasMoreNext,
            isContainerModalOpen
        } = this.props;
        
        // (bpo): Defined in "componentDidMount" method
        // this.el = height ? document.getElementById('infScroll') : window;
        // this.el.addEventListener('scroll', this.debouncedOnScrollListener);
        
        if (!isScrollbarVisible(this.el) && !isMobile && !isContainerModalOpen) {
            if (hasMore || hasMoreNext) {
                next();
            }
        }
    };
    
    isElementAtBottom(target) {
        const scrolled = target.scrollHeight - target.scrollTop;
        const result = scrolled <= screen.height && scrolled > 100;
        
        return result;
    }
    
    onScrollListener() {
        const { lastScrollTop, actionTriggered } = this.state;
        // todo: Add "self" props for determine global or local container scrolling
        const {
            self,
            height,
            prevFiredHeight,
            prev,
            next,
            hasMore,
            hasMoreNext,
            hasMorePrev,
            scrollThreshold
        } = this.props;
        
        let target = height
            ? this.el
            : (document.documentElement.scrollTop ? document.documentElement : document.body);
        // const target = this.el;
        
        // if user scrolls up, remove action trigger lock
        
        if (target.scrollTop < lastScrollTop) {
            
            if (target.scrollTop <= prevFiredHeight && prev && (hasMore || hasMorePrev )) {
                prev();
                this.setState({
                    actionTriggered: true,
                    showLoader: false,
                    showPrev: true
                });
                return;
            }
            
            this.setState({
                actionTriggered: false,
                lastScrollTop: target.scrollTop
            });
            
            return; // user's going up, we don't care
        }
        
        // return immediately if the action has already been triggered,
        // prevents multiple triggers.
        if (actionTriggered) return;
        
        let atBottom = this.isElementAtBottom(target, scrollThreshold);
        
        // call the `next` function in the props to trigger the next data fetch
        if (atBottom && ( hasMore || hasMoreNext)) {
            next();
            this.setState({
                actionTriggered: true,
                showLoader: true,
                showPrev: false
            });
        }
        this.setState({ lastScrollTop: target.scrollTop });
    }
    
    /************** renders **************/
    
    render() {
        let {
            next,
            height,
            hasChildren,
            hasMore,
            hasMoreNext,
            loader,
            children,
            isContainerModalOpen
        } = this.props;
        
        const { showPrev, showLoader } = this.state;
        
        hasChildren = hasChildren || !!(children && children.length);
        hasMore = hasMore || hasMoreNext;
        const isShowLoader = !showPrev && (showLoader || !hasChildren && hasMore);
        
        return (
            <InfiniteScrollComponent
                isContainerModalOpen={isContainerModalOpen}
                next={next}
                height={height}
                children={children}
                hasMore={hasMore}
                isShowLoader={isShowLoader}
                loader={loader}
            />
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isContainerModalOpen: state.common.isContainerModalOpen
    };
};

export default connect(mapStateToProps)(InfiniteScroll);
