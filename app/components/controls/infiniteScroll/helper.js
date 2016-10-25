export const isScrollbarVisible = (rootElem) => {
    // The Modern solution
    // ? (bpo): document.getElementById('app-view')
    if (typeof window.innerWidth === 'number') {
        return window.innerWidth > document.documentElement.clientWidth;
    }

    rootElem = rootElem || window;
    if (!rootElem) {
        return false;
    }

    // Check overflow style property on body for fauxscrollbars
    let overflowStyle;
    if (typeof rootElem.currentStyle !== 'undefined') {
        overflowStyle = rootElem.currentStyle.overflow;
    }
    overflowStyle = overflowStyle || window.getComputedStyle(rootElem, '').overflow;

    // Also need to check the Y axis overflow
    let overflowYStyle;
    if (typeof rootElem.currentStyle !== 'undefined') {
        overflowYStyle = rootElem.currentStyle.overflowY;
    }
    overflowYStyle = overflowYStyle || window.getComputedStyle(rootElem, '').overflowY;

    const contentOverflows = rootElem.scrollHeight > rootElem.clientHeight;
    const overflowShown = /^(visible|auto)$/.test(overflowStyle) || /^(visible|auto)$/.test(overflowYStyle);
    const alwaysShowScroll = overflowStyle === 'scroll' || overflowYStyle === 'scroll';

    return contentOverflows && overflowShown || alwaysShowScroll;
};

export const debounce = (func, wait) => {
    let timeout;
    return () => {
        const _this = this;
        const args = arguments;

        const later = () => {
            timeout = null;
            func.apply(_this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
