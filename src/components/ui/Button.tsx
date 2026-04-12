import React from "react";

type ButtonSize = "S" | "L";
type ButtonVariant = "black" | "green";

interface ButtonProps {
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "S",
  variant = "black",
  disabled = false,
  onClick,
  className = "",
  type = "button",
}) => {
  const sizeStyles = {
    S: "w-[361px] h-[44px]",
    L: "w-[361px] h-[56px]",
  };

  const baseStyle = `
    inline-flex items-center justify-center gap-2
    rounded-[10px]
    transition
    whitespace-nowrap
  `;

  const variantStyles = {
    black: "bg-[#111111] text-white",
    green: "bg-[#32E389] text-white",
  };

  const disabledStyle = "bg-[#C3C3C3] text-white cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyle}
        ${sizeStyles[size]}
        ${disabled ? disabledStyle : variantStyles[variant]}
        button-text typo-button
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
