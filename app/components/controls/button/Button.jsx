'use strict';

import { Link } from 'react-router';
import classNames from 'classnames';


class Button extends React.Component {

    static propTypes = {
        className: React.PropTypes.string,
        route: React.PropTypes.string,
        text: React.PropTypes.string,
        onClick: React.PropTypes.func,
        iconView: React.PropTypes.object,
        active: React.PropTypes.bool,
        disabled: React.PropTypes.bool
    };

    static defaultProps = {
        active: true
    };

    render() {
        const {
            route,
            onClick,
            active,
            className,
            disabled,
            text,
            iconView
        } = this.props;

        const classesObj = {
            'btn': !className,
            'disabled': disabled,
            'active': active
        };

        classesObj[className] = !!className;
        const btnClassNames = classNames(classesObj);

        if (onClick) {
            return (
                <button className={btnClassNames} onClick={onClick}>
                    {iconView}
                    {text}
                </button>
            );
        }

        if (route) {
            return (
                <Link className={btnClassNames} to={route}>
                    {iconView}
                    {text}
                </Link>
            );
        }

        return <div/>;
    }
}

export default Button;
