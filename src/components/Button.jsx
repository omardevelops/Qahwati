import './Button.css';

function Button({ variant = 'primary', size = 'md', children, className = '', ...props }) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
