import React, { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Spin, Result, Button } from "antd"
import { useVerifyEmailMutation } from "@/features/auth"

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation()
  const [status, setStatus] = useState("verifying") // verifying, success, error

  useEffect(() => {
    let mounted = true

    const verify = async () => {
      if (!token || !email) {
        setStatus("error")
        return
      }

      try {
        await verifyEmail({ email, token }).unwrap()
        if (mounted) setStatus("success")
      } catch (err) {
        console.error("Email verification failed:", err)
        if (mounted) setStatus("error")
      }
    }

    verify()

    return () => {
      mounted = false
    }
  }, [token, email, verifyEmail])

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {status === "verifying" && (
          <div className="text-center py-8">
            <Spin size="large" />
            <h2 className="mt-4 text-xl font-bold text-gray-800">
              Verifying your email...
            </h2>
          </div>
        )}

        {status === "success" && (
          <div className="py-4">
            <Result
              status="success"
              title="Email Verified Successfully!"
              subTitle="Thank you for verifying your email address. You can now use all features of Cat Speak."
              extra={[
                <Link to="/" key="login">
                  <Button type="primary" shape="round" size="large">
                    Go to Home
                  </Button>
                </Link>,
              ]}
            />
          </div>
        )}

        {status === "error" && (
          <div className="py-4">
            <Result
              status="error"
              title="Verification Failed"
              subTitle="The verification link is invalid or has expired."
              extra={[
                <Link to="/" key="home">
                  <Button type="primary" shape="round" size="large">
                    Back to Home
                  </Button>
                </Link>,
              ]}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmailPage
