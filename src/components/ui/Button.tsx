import React from "react";

type ButtonSize = "S" | "L";
type ButtonVariant = "black" | "green" | "gray";

interface ButtonProps {
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  size = "S",
  variant = "black",
  disabled = false,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const sizeStyles = {
    S: "h-[44px]",
    L: "h-[56px]",
  };

  const baseStyle = `
    inline-flex items-center justify-center gap-2
    rounded-M
    transition
    whitespace-nowrap
    typo-l-strong
  `;

  const variantStyles = {
    black: "bg-gray-80 text-gray-0",
    green: "bg-green text-gray-0",
    gray: "bg-gray-30 text-gray-0",
  };

  const disabledStyle = "bg-gray-30 text-gray-0 cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={` ${baseStyle} ${sizeStyles[size]} ${disabled ? disabledStyle : variantStyles[variant]} button-text typo-l-strong w-full ${className} `}
    >
      {children}
    </button>
  );
}
