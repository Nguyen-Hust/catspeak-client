const ForbiddenPage = () => (
  <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
    <p className="text-sm uppercase tracking-[0.3em] text-white/60">403</p>
    <h1 className="mt-2 text-4xl font-semibold text-white">Bạn không có quyền truy cập</h1>
    <p className="mt-4 max-w-xl text-white/70">
      Vui lòng đăng nhập bằng tài khoản được cấp phép hoặc liên hệ quản trị viên để mở quyền. Hệ
      thống đã ghi nhận yêu cầu của bạn.
    </p>
  </section>
)

export default ForbiddenPage

