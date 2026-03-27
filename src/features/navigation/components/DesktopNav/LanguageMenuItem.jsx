const LanguageMenuItem = ({
  code,
  label,
  flag,
  disabled,
  onSelect,
  soonLabel,
  isActive,
}) => (
  <button
    disabled={disabled}
    onClick={(e) => {
      if (disabled) e.preventDefault()
      else onSelect(code, label)
    }}
    className={`flex w-full items-center gap-3 px-4 h-10 text-sm text-left transition-colors ${
      disabled
        ? "text-[#7A7574] cursor-default"
        : "text-[#1C1A1A] hover:bg-[#E5E5E5]"
    }`}
    style={{
      backgroundColor: isActive ? "#E5E5E5" : undefined,
    }}
  >
    <div className="flex flex-shrink-0 items-center">
      <img
        src={flag}
        alt={label}
        className={`h-5 w-5 rounded-full object-cover shadow-sm ${
          disabled ? "grayscale opacity-50" : ""
        }`}
      />
    </div>
    {disabled ? (
      <div className="flex w-full items-center justify-between">
        <span className="font-normal truncate">{label}</span>
        {soonLabel && (
          <span className="ml-2 whitespace-nowrap rounded-full px-2 py-0.5 text-xs uppercase tracking-wider text-[#7A7574] border border-[#C6C6C6]">
            {soonLabel}
          </span>
        )}
      </div>
    ) : (
      <span className="font-normal truncate">{label}</span>
    )}
  </button>
)

export default LanguageMenuItem
