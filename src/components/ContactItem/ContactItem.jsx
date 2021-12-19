import PropTypes from 'prop-types'
import s from './ContactItem.module.css'

function ContactItem({ id, name, number, onDelete }) {
  return (
    <>
      <span className={s.itemText}>{name}</span>
      <span className={s.itemText}>{number}</span>
      <button
        type="button"
        className={s.button}
        data-id={id}
        onClick={() => {
          onDelete(id)
        }}
      >
        Delete
      </button>
    </>
  )
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ContactItem