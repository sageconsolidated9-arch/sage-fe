import { useState, useEffect, useRef } from "react";
import { Eye } from "lucide-react";
import { getImageSrc } from "../../utils/imageUtils";
import type { InputProps } from "../../types/extra";
import { InfoFillIcon, SearchIcon } from "../../utils/icons";

const Input: React.FC<InputProps> = ({
  type,
  label,
  value: propValue = "",
  onChange,
  placeholder,
  className = "",
  required = false,
  name,
  search = false,
  searchPosition = "right",
  width,
  reset = false,
  approved = false,
  disabled = false,
  error = false,
  maxLength, // Add this
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selection, setSelection] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const realInputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    const newShow = !showPassword;
    setShowPassword(newShow);

    if (realInputRef.current) {
      setSelection({
        start: realInputRef.current.selectionStart || 0,
        end: realInputRef.current.selectionEnd || 0,
      });
    }
  };

  useEffect(() => {
    if (selection && realInputRef.current) {
      realInputRef.current.setSelectionRange(selection.start, selection.end);
      realInputRef.current.focus();
    }
  }, [showPassword, selection]);

  const getInputPadding = () => {
    if (search) return searchPosition === "left" ? "pl-10 pr-4" : "pl-4 pr-10";
    if (type === "password") {
      return error || approved ? "pl-4 pr-20" : "pl-4 pr-10";
    }
    return error || approved ? "pl-4 pr-10" : "pl-4 pr-4";
  };

  const isPasswordField = type === "password";
  const isMasked = isPasswordField && !showPassword && propValue;

  // Use middle dot (•) or asterisk (*) - middle dot is more centered vertically
  const displayValue = isMasked
    ? "*".repeat(String(propValue).length) // Using bullet char for better vertical centering
    : propValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isMasked) {
      const input = e.target;
      const newValue = input.value;
      const oldValue = String(propValue);

      if (newValue.length > oldValue.length) {
        const caretPos = input.selectionStart || 0;
        const addedChar = newValue[caretPos - 1];
        const newRealValue =
          oldValue.slice(0, caretPos - 1) +
          addedChar +
          oldValue.slice(caretPos - 1);

        const syntheticEvent = {
          ...e,
          target: { ...input, value: newRealValue },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange?.(syntheticEvent);
        setSelection({ start: caretPos, end: caretPos });
      } else if (newValue.length < oldValue.length) {
        const caretPos = input.selectionStart || 0;
        const deleteCount = oldValue.length - newValue.length;
        const newRealValue =
          oldValue.slice(0, caretPos) + oldValue.slice(caretPos + deleteCount);

        const syntheticEvent = {
          ...e,
          target: { ...input, value: newRealValue },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange?.(syntheticEvent);
        setSelection({ start: caretPos, end: caretPos });
      }
    } else {
      onChange?.(e);
    }
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setSelection({
      start: input.selectionStart || 0,
      end: input.selectionEnd || 0,
    });
  };

  return (
    <div className="relative w-full flex flex-col gap-1">
      {label && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="block text-sm text-text-primary">{label}</label>
          </div>
        </div>
      )}

      <div className={`relative ${width}`}>
        {/* Hidden real input for form submission when masked */}
        {isMasked && <input type="hidden" name={name} value={propValue} />}

        {/* Visual input with vertical centering */}
        <input
          ref={realInputRef}
          type="text"
          name={isMasked ? undefined : name}
          value={displayValue}
          onChange={handleChange}
          onSelect={handleSelect}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength} // Add this
          className={`
            ${className === "" ? "bg-surface border border-input-border" : className}
            w-full text-sm text-text-tertiary appearance-none rounded-xl focus:outline-none
            ${disabled ? "bg-gray-50 cursor-not-allowed" : ""}
            ${error ? "bg-surface border border-primary shadow-error" : ""}
            ${getInputPadding()}
            /* Vertical centering styles */
            h-10
            leading-10
            ${isMasked ? "font-normal tracking-[0.2em]" : "leading-[22px] py-2"}
          `}
        />

        {/* Password toggle and status icons */}
        {isPasswordField && (
          <>
            {(error || approved) && (
              <div className="absolute inset-y-0 right-10 pr-2 flex items-center pointer-events-none">
                {error && <InfoFillIcon className="text-error w-5 h-5" />}
                {!error && approved && (
                  <img
                    src={getImageSrc("check_circle.svg")}
                    alt=""
                    className="w-5 h-5"
                  />
                )}
              </div>
            )}

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            >
              {showPassword ? (
                <img
                  className="w-6 h-6"
                  src={getImageSrc("eye-off.svg")}
                  alt=""
                />
              ) : (
                <Eye className="h-6 w-6 text-[#525252]" />
              )}
            </button>
          </>
        )}

        {/* Search and other icons */}
        {search && (
          <div
            className={`absolute inset-y-0 ${searchPosition === "left" ? "left-0 pl-3" : "right-0 pr-3"} flex items-center pointer-events-none`}
          >
            <SearchIcon className="w-6 h-6 text-text-muted" />
          </div>
        )}

        {!isPasswordField && approved && !search && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <img
              src={getImageSrc("check_circle.svg")}
              alt=""
              className="w-5 h-5"
            />
          </div>
        )}

        {!isPasswordField && error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <InfoFillIcon className="text-error w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
