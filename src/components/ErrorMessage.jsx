import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error">
      {message}
    </div>
  );
};


ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};


export default ErrorMessage;