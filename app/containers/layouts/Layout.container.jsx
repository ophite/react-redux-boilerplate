import LayoutPage from '../../components/pages/layouts/Layout.page.jsx';


class Layout extends React.Component {

    handleKeyDown(e) {
        const { isModalOpen, handleCloseModal } = this.props;

        if (e.keyCode === '27' && isModalOpen) {
            handleCloseModal();
        }
    }

    render() {
        return (
            <LayoutPage
                {...this.props}
                {...this.state}
                handleKeyDown={this.handleKeyDown.bind(this)}
            />
        );
    }
}

export default Layout;
