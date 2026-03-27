import Checkbox from "@/shared/components/ui/inputs/Checkbox"

const AgreementCheckbox = ({ checked, onChange, children }) => {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <Checkbox checked={checked} onChange={onChange} />
      <span className="text-sm text-gray-600">{children}</span>
    </label>
  )
}

export default AgreementCheckbox
