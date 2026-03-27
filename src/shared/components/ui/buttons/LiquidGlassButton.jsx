/**
 * LiquidGlassButton - Component nút với hiệu ứng liquid glass
 * @param {string} variant - Màu sắc: 'default' (xám), 'yellow' (vàng), hoặc 'gradient' (đỏ/cam/vàng)
 * @param {React.ReactNode} children - Nội dung nút
 * @param {function} onClick - Hàm xử lý khi click
 * @param {string} className - Class CSS bổ sung
 * @param {object} props - Các props khác của button
 */
const LiquidGlassButton = ({ 
  variant = 'default', 
  children, 
  onClick, 
  className = '', 
  ...props 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'yellow':
        return 'liquid-glass-yellow'
      case 'gradient':
        return 'liquid-glass-gradient'
      default:
        return 'liquid-glass'
    }
  }
  
  return (
    <button
      onClick={onClick}
      className={`${getVariantClass()} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default LiquidGlassButton

