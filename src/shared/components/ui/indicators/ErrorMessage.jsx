import React from "react"

const ErrorMessage = ({
  message = "An error occurred",
  className = "p-10",
}) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="rounded-md bg-red-50 p-4 text-center text-sm text-red-500">
        {message}
      </div>
    </div>
  )
}

export default ErrorMessage
