import { Navigate } from 'react-router-dom'

/**
 * ProtectedRoute - Component để bảo vệ các route yêu cầu authentication
 * @param {Object} props
 * @param {React.ReactNode} props.children - Component con cần được bảo vệ
 * @param {boolean} props.isAuthenticated - Trạng thái đăng nhập
 * @param {string} props.redirectTo - Đường dẫn redirect nếu chưa đăng nhập (mặc định: '/')
 * @param {boolean} props.requireAdmin - Yêu cầu quyền admin (mặc định: false)
 * @param {boolean} props.isAdmin - Trạng thái quyền admin
 */
const ProtectedRoute = ({
  children,
  isAuthenticated = false,
  redirectTo = '/',
  requireAdmin = false,
  isAdmin = false,
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/403" replace />
  }

  return children
}

export default ProtectedRoute

