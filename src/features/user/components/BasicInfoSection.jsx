import React from "react"
import EditableField from "./EditableField"
import CountryDropdown from "./CountryDropdown"

const BasicInfoSection = ({
  formData,
  editingField,
  isUpdating,
  onEdit,
  onCancel,
  onSave,
  onChange,
  onCountryChange,
  t,
}) => {
  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Full Name / Username */}
      <EditableField
        label={t.profile?.personalInfo?.username || "Họ và tên"}
        value={formData.username}
        name="username"
        isEditing={editingField === "username"}
        isUpdating={isUpdating}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={onSave}
        onChange={onChange}
        editLabel={t.profile?.personalInfo?.edit || "Edit"}
      />

      {/* Nickname */}
      <EditableField
        label={t.profile?.personalInfo?.nickname || "Nickname"}
        value={formData.nickname}
        name="nickname"
        isEditing={editingField === "nickname"}
        isUpdating={isUpdating}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={onSave}
        onChange={onChange}
        editLabel={t.profile?.personalInfo?.edit || "Edit"}
      />

      {/* Country */}
      <div className="flex items-center justify-between border-b border-gray-100 py-3">
        <span className="w-32 font-bold text-gray-900">
          {t.profile?.personalInfo?.country || "Quốc gia"}
        </span>
        <div className="flex-1"></div>
        <CountryDropdown
          value={formData.country}
          onChange={onCountryChange}
        />
      </div>

      {/* Account Type */}
      <div className="flex items-center justify-between border-b border-gray-100 py-3">
        <span className="w-32 font-bold text-gray-900">
          {t.profile?.personalInfo?.accountType || "Account type"}
        </span>
        <span className="flex-1 text-gray-600">{formData.accountType}</span>
      </div>
    </div>
  )
}

export default BasicInfoSection
