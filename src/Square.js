import React from 'react';

class Square extends React.Component {
    componentDidMount() {
        console.log("Square Did Mount");
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.value !== nextProps.value
    }
    componentDidUpdate() {
        console.log("Square Did Update");
    }
    render() {
        const {onClick, value} = this.props
        return (
            <span className={`square ${value ? 'blocked' : 'pointer'}`} onClick={onClick}>{value}</span>
        )
    }
}

export default Square;