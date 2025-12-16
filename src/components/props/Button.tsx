import type { ButtonProps } from "../../types/extra";
import { getImageSrc } from "../../utils/imageUtils";

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  icon,
  iconPosition = "left",
  variant = "primary",
  height = "min-h-[52px]",
  paddingX = "px-4",
  paddingY = "py-2",
  shadow = "shadow-button-default",
  textSize = "text-base",
  lineHeight = "leading-[100%]",
  format = "uppercase",
  ...rest
}) => {
  // Base classes that apply to all variants
  const baseClasses = `font-semibold rounded-[12px] w-full transition-colors tracking-[2%] flex items-center justify-center gap-2 ${height} ${paddingX} ${paddingY} ${shadow} ${textSize} ${format}`;

  // Disabled classes (same for all variants)
  const disabledClasses = "bg-primary-100 text-white cursor-not-allowed";

  // Active variant classes (when not disabled)
  const activeVariantClasses: Record<"primary" | "white", string> = {
    primary:
      "bg-primary text-white cursor-pointer hover:bg-primary-hover border border-surface",
    white:
      "bg-white text-text-secondary border border-text-secondary cursor-pointer hover:bg-gray-50",
  };

  // Get the appropriate variant class
  const variantClass = activeVariantClasses[variant];

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : variantClass}`}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <span className="flex items-center justify-center">
          {typeof icon === "string" ? (
            <img src={getImageSrc(icon)} alt="" />
          ) : (
            icon
          )}
        </span>
      )}

      <span>{children}</span>

      {icon && iconPosition === "right" && (
        <span className="flex items-center justify-center">
          {typeof icon === "string" ? (
            <img src={getImageSrc(icon)} alt="" />
          ) : (
            icon
          )}
        </span>
      )}
    </button>
  );
};

export default Button;
