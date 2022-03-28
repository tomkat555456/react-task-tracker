import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button text={showAdd ? 'close' : 'add'} color={showAdd ? 'red' : 'green'} onAdd={onAdd} />
        </header>
    )
}

Header.deafultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}


//CSS in JS
// const headingstyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header
