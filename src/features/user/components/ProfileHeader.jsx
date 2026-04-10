import React from "react"
import Avatar from "@/shared/components/ui/Avatar"

const ProfileHeader = ({ avatarImageUrl, username, t }) => {
  return (
    <div className="relative mb-10">
      {/* Cover Image — same as RoomCard for visual consistency */}
      <div className="h-48 w-full overflow-hidden rounded-xl bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
          alt="Cover"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Avatar Section */}
      <div className="absolute -bottom-12 left-8 flex items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <Avatar
            size={96}
            src={avatarImageUrl}
            alt="Avatar"
            name={username}
            className="border-4 border-white"
          />
        </div>

        {/* TODO: Avatar Selection List — feature not yet implemented */}
        {/* <div className="mb-2 flex flex-wrap gap-2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden cursor-pointer hover:scale-110 transition-transform"
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                alt="avatar option"
              />
            </div>
          ))}
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50">
            <Plus size={16} />
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default ProfileHeader
