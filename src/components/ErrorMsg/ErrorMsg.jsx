import "./ErrorMsg.scss";

const ErrorMsg = ({ src }) => {
  return (
    <div className="error">
      <img className="error-icon" src={src} alt="Error icon" />
      <p>This field is required</p>
    </div>
  );
};

export default ErrorMsg;
