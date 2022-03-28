import PropTypes from 'prop-types'

const Button = ({ color, text, onAdd }) => {
    return (
        <button 
            onClick={onAdd} 
            style={{backgroundColor: color}} 
            className="btn"
        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
}



export default Button
