// Helper function to generate consistent colors based on username
export const getColorFromUsername = (username) => {
  const colors = [
    "#c21010",
    "#2563eb",
    "#f59e0b",
    "#0ea5e9",
    "#8b5cf6",
    "#ec4899",
  ]
  const hash = username
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

// Get initials from username
export const getInitials = (username) => {
  if (!username) return "?"
  return username.slice(0, 2).toUpperCase()
}
