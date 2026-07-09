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
    S: "h-11",
    L: "h-14",
  };

  const baseStyle =
    "typo-l-strong inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl text-center transition";

  const variantStyles = {
    black: "bg-gray-80 text-gray-0",
    green: "bg-green text-gray-0",
  };

  const disabledStyle = "bg-gray-30 text-gray-0 cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={` ${baseStyle} ${sizeStyles[size]} ${disabled ? disabledStyle : variantStyles[variant]} ${className} `}
    >
      {children}
    </button>
  );
}
