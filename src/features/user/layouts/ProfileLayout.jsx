import React from "react"
import { Outlet } from "react-router-dom"
import ProfileSidebar from "../components/ProfileSidebar"

const ProfileLayout = () => {
  return (
    <div className="flex w-full h-[calc(100vh-90px)] overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-[320px] p-5 flex-shrink-0 overflow-y-auto">
        <ProfileSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto">
        <div className="mx-auto w-full max-w-[1040px] min-w-[450px] p-5">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default ProfileLayout
