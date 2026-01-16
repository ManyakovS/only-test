interface NavigationControlProps {
    direction?: 'left' | 'right';
    onClick?: () => void;
    className?: string;
}

const NavigationControl = ({ direction = 'right', onClick, className } : NavigationControlProps) => {
  return (
    <button 
      className={`navigation-control navigation-control--${direction} ${className}`} 
      onClick={onClick}
      aria-label={direction === 'right' ? 'Next' : 'Previous'}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {direction === 'right' ? (
          <polyline points="9 18 15 12 9 6" />
        ) : (
          <polyline points="15 18 9 12 15 6" />
        )}
      </svg>
    </button>
  );
};

export default NavigationControl;