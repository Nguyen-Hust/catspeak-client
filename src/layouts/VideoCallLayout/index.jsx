import { Outlet, ScrollRestoration } from "react-router-dom"

const VideoCallLayout = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Outlet />
      <ScrollRestoration />
    </div>
  )
}

export default VideoCallLayout
