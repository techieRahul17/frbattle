import { useRef } from "react"

export default function RippleButton({ children, className = "", ...props }) {
  const btnRef = useRef()

  const createRipple = (e) => {
    const button = btnRef.current
    const circle = document.createElement("span")
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2
    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`
    circle.classList.add("ripple")
    const ripple = button.getElementsByClassName("ripple")[0]
    if (ripple) ripple.remove()
    button.appendChild(circle)
  }

  return (
    <button
      ref={btnRef}
      className={`relative overflow-hidden ${className}`}
      onClick={(e) => {
        createRipple(e)
        if (props.onClick) props.onClick(e)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

// Add the following CSS to your global styles (e.g., index.css):
// .ripple {
//   position: absolute;
//   border-radius: 50%;
//   transform: scale(0);
//   animation: ripple 600ms linear;
//   background: rgba(59, 130, 246, 0.4);
//   pointer-events: none;
//   z-index: 10;
// }
// @keyframes ripple {
//   to {
//     transform: scale(4);
//     opacity: 0;
//   }
// } 