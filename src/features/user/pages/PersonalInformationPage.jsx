import React, { useEffect, useState } from "react"
import { useAuth } from "@/features/auth"
import { useLanguage } from "@/shared/context/LanguageContext"
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/features/user/api/userApi"

import ProfileHeader from "../components/PersonalInformation/ProfileHeader"
import BasicInfoSection from "../components/PersonalInformation/BasicInfoSection"
import AccountPrivacySection from "../components/PersonalInformation/AccountPrivacySection"

const PersonalInformationPage = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { data: profileData, isLoading } = useGetUserProfileQuery()

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    accountType: "Student",
    level: "HSK3",
    address: "",
    avatarImageUrl: "",
  })

  const [editingField, setEditingField] = useState(null)

  useEffect(() => {
    if (profileData?.data) {
      setFormData({
        username: profileData.data.username || "",
        email: profileData.data.email || "",
        accountType: profileData.data.roleName || "Student",
        level: profileData.data.level || "HSK3",
        address: profileData.data.address || "",
        avatarImageUrl: profileData.data.avatarImageUrl || "",
      })
    }
  }, [profileData])

  const handleEdit = (field) => {
    setEditingField(field)
  }

  const handleCancel = () => {
    setEditingField(null)
    if (profileData?.data) {
      setFormData((prev) => ({
        ...prev,
        username: profileData.data.username || "",
        address: profileData.data.address || "",
      }))
    }
  }

  const handleSave = async () => {
    try {
      await updateProfile({
        username: formData.username,
        avatarImageUrl: formData.avatarImageUrl,
        address: formData.address,
        dateOfBirth: profileData?.data?.dateOfBirth, // Preserve existing
        level: formData.level,
        preferredLanguage: profileData?.data?.preferredLanguage, // Preserve existing
        country: profileData?.data?.country, // Preserve existing
      }).unwrap()
      setEditingField(null)
    } catch (error) {
      console.error("Failed to update profile", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-bold text-red-900">
        {t.profile?.personalInfo?.title}
      </h1>

      <ProfileHeader avatarImageUrl={formData.avatarImageUrl} t={t} />

      <BasicInfoSection
        formData={formData}
        editingField={editingField}
        isUpdating={isUpdating}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
        onChange={handleChange}
        t={t}
      />

      <AccountPrivacySection
        formData={formData}
        editingField={editingField}
        isUpdating={isUpdating}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
        onChange={handleChange}
        t={t}
      />
    </div>
  )
}

export default PersonalInformationPage
