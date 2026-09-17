function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
    const variants = {
    primary:
        'bg-darkwood text-cream hover:bg-walnut',

    secondary:
        'bg-cream text-darkwood border border-walnut/20 hover:border-walnut/40',
    }

  return (
    <button
    className={`
        rounded-lg
        px-4 py-2
        font-ui
        text-sm
        transition-colors
        cursor-pointer
        ${variants[variant]}
        ${className}
    `}
    {...props}
    >
    {children}
    </button>
  )
}

export default Button