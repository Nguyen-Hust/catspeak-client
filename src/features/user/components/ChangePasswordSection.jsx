import React, { useState } from "react"
import { Check, X, Eye, EyeOff } from "lucide-react"
import { useChangePasswordMutation } from "@/store/api/userApi"

const ChangePasswordSection = ({ t }) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const [isEditing, setIsEditing] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleEdit = () => {
    setIsEditing(true)
    setShowPasswords(false)
    setError("")
  }

  const handleCancel = () => {
    setIsEditing(false)
    setShowPasswords(false)
    setError("")
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleSave = async () => {
    setError("")

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError(t.validation?.password?.allFieldsRequired || "All password fields are required")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError(t.validation?.password?.mismatch || "Passwords do not match")
      return
    }

    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap()

      handleCancel()
    } catch (err) {
      const serverMsg = err?.data?.message || ""
      const isIncorrectPassword = serverMsg.toLowerCase().includes("current password")

      setError(
        isIncorrectPassword
          ? (t.validation?.password?.currentIncorrect || "Current password is incorrect")
          : (t.validation?.password?.changeFailed || "Failed to change password")
      )
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const inputType = showPasswords ? "text" : "password"

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between border-b border-gray-100 py-3">
        <span className="w-32 font-bold text-gray-900">
          {t.profile?.personalInfo?.password || "Password"}
        </span>
        <span className="flex-1 text-gray-600 tracking-widest text-lg">
          ***********
        </span>
        <button
          onClick={handleEdit}
          className="font-bold text-red-800 hover:text-red-900"
        >
          {t.profile?.personalInfo?.reset || "Reset"}
        </button>
      </div>
    )
  }

  return (
    <div className="border-b border-gray-100 py-3">
      <div className="flex items-center justify-between mb-4">
        <span className="w-32 font-bold text-gray-900">
          {t.profile?.personalInfo?.password || "Password"}
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPasswords((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title={showPasswords ? "Hide passwords" : "Show passwords"}
          >
            {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="font-bold text-green-600 hover:text-green-700 disabled:opacity-50"
          >
            <Check size={18} />
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="font-bold text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 pl-32">
        <input
          type={inputType}
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder={t.profile?.personalInfo?.currentPassword || "Current password"}
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-red-900 focus:outline-none"
        />
        <input
          type={inputType}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder={t.profile?.personalInfo?.newPassword || "New password"}
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-red-900 focus:outline-none"
        />
        <input
          type={inputType}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder={t.profile?.personalInfo?.confirmPassword || "Confirm new password"}
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-red-900 focus:outline-none"
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  )
}

export default ChangePasswordSection
