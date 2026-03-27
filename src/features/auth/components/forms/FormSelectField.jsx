import { ChevronDown } from "lucide-react"

const FormSelectField = ({
  placeholder,
  value,
  onChange,
  error,
  errorText,
  options,
}) => {
  return (
    <div>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`h-10 w-full appearance-none rounded-lg border bg-white px-3 pr-10 text-sm outline-none transition-colors
            focus:border-cath-red-700 focus:ring-1 focus:ring-cath-red-700 hover:border-cath-red-700
            ${!value ? "text-gray-400" : "text-gray-900"}
            ${error ? "border-red-600 focus:border-red-600 focus:ring-red-600" : "border-[#C6C6C6]"}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
      {errorText && (
        <p className="mt-1 text-xs text-red-600">{errorText}</p>
      )}
    </div>
  )
}

export default FormSelectField
