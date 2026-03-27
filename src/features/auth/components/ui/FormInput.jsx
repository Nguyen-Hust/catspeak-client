import { Form, Input } from "antd"
import colors from "@/shared/utils/colors"

const FormInput = ({ name, label, placeholder, rules, type = "text" }) => {
  const InputComponent = type === "password" ? Input.Password : Input

  return (
    <Form.Item
      name={name}
      label={
        <span className="text-sm font-semibold text-gray-700">{label}</span>
      }
      rules={rules}
    >
      <InputComponent
        placeholder={placeholder}
        className="rounded-full px-4 py-3 text-base"
        style={{ borderColor: colors.border }}
      />
    </Form.Item>
  )
}

export default FormInput
