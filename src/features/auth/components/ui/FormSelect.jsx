import { Form, Select, ConfigProvider } from "antd"
import colors from "@/shared/utils/colors"

const FormSelect = ({ name, label, placeholder, rules, options }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            controlHeight: 48,
            borderRadius: 9999,
            controlPaddingHorizontal: 16,
            fontSize: 16,
          },
        },
      }}
    >
      <Form.Item
        name={name}
        label={
          <span className="text-sm font-semibold text-gray-700">{label}</span>
        }
        rules={rules}
      >
        <Select
          placeholder={placeholder}
          popupMatchSelectWidth={false}
          getPopupContainer={(trigger) => trigger.parentNode}
          style={{
            borderColor: colors.border,
            borderRadius: "9999px",
            fontSize: "16px",
          }}
          className="w-full text-base"
          dropdownStyle={{ zIndex: 9999 }}
          options={options}
        />
      </Form.Item>
    </ConfigProvider>
  )
}

export default FormSelect
