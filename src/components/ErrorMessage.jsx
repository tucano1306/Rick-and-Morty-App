import PropTypes from 'prop-types';

function ErrorMessage({ message }) {
  return (
    <div className="error">
      <div className="error__icon">❌</div>
      <div className="error__content">
        <h3 className="error__title">Error</h3>
        <p className="error__message">{message}</p>
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;