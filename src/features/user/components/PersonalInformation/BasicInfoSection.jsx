import React from "react"
import EditableField from "./EditableField"

const BasicInfoSection = ({
  formData,
  editingField,
  isUpdating,
  onEdit,
  onCancel,
  onSave,
  onChange,
  t,
}) => {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <EditableField
        label={t.profile?.personalInfo?.username}
        value={formData.username}
        name="username"
        isEditing={editingField === "username"}
        isUpdating={isUpdating}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={onSave}
        onChange={onChange}
        editLabel={t.profile?.personalInfo?.edit}
      />

      {/* Email (Read only) */}
      <div className="flex items-center justify-between border-b border-gray-100 py-3">
        <span className="w-32 font-bold text-gray-900">
          {t.profile?.personalInfo?.email}
        </span>
        <span className="flex-1 text-gray-600">{formData.email}</span>
        <button className="font-bold text-gray-400 cursor-not-allowed">
          {t.profile?.personalInfo?.edit}
        </button>
      </div>

      {/* Account Type */}
      <div className="flex items-center justify-between border-b border-gray-100 py-3">
        <span className="w-32 font-bold text-gray-900">
          {t.profile?.personalInfo?.accountType}
        </span>
        <span className="flex-1 text-gray-600">{formData.accountType}</span>
      </div>

      {/* Level */}
      <div className="flex items-center justify-between border-b border-gray-100 py-3">
        <span className="w-32 font-bold text-gray-900">
          {t.profile?.personalInfo?.level}
        </span>
        <div className="flex-1"></div>
        <div className="relative">
          <button className="flex items-center gap-2 rounded border border-gray-200 px-3 py-1 text-sm font-bold text-red-900 hover:bg-gray-50">
            {formData.level}
            <span className="text-gray-400">▼</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BasicInfoSection
