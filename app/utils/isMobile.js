import isMobile from 'ismobilejs';

const isMobileWrapper = () => {
    const isDeviceByWidth = window && window.innerWidth < 769;
    return isMobile.any && isMobile.phone || isDeviceByWidth;
};

export default isMobileWrapper();

export const calcIsMobile = (screenWidth, alwaysMobileIfDevice = false) => {
    const isDeviceByWidth = window && screenWidth < 769;
    if (alwaysMobileIfDevice) {
        return isMobile.phone || isMobile.tablet;
    }

    return isMobile.any && isMobile.phone || isDeviceByWidth;
};
