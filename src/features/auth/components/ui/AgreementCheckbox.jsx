import { Form, Checkbox } from "antd"

const AgreementCheckbox = ({ name, rules, children, ...props }) => {
  return (
    <Form.Item name={name} valuePropName="checked" rules={rules} {...props}>
      <Checkbox className="text-sm text-gray-600">{children}</Checkbox>
    </Form.Item>
  )
}

export default AgreementCheckbox
