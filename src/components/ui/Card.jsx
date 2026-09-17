function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-walnut/20 bg-cream p-5 ${className}`}
    >
      {children}
    </div>
  )
}

export default Card