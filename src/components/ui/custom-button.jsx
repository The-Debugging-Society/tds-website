export default function CustomButton({ children, isActive, variant = "outline", onClick }) {
    const baseStyles = "rounded-full px-8 py-6 text-lg font-medium transition-all duration-200"
  
    const variants = {
      outline: isActive
        ? "bg-blue-500 text-white border-2 border-transparent hover:bg-blue-600"
        : "border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10",
      solid: "bg-blue-500 text-white hover:bg-blue-600",
      cyan: "bg-cyan-400 text-black hover:bg-cyan-500",
    }
  
    return (
      <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
        {children}
      </button>
    )
  }