import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ConfigProvider } from "antd"
import "@styles/index.css"
import "antd/dist/reset.css"
import App from "./App.jsx"
import { colors } from "@/shared/utils/colors.js"
import { LanguageProvider } from "./shared/context/LanguageContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primary,
          borderRadius: 8,
          // Có thể thêm các token khác
          colorSuccess: colors.success,
          colorWarning: colors.warning,
          colorError: colors.danger,
        },
        components: {
          Button: {
            primaryColor: colors.primary,
          },
        },
      }}
    >
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ConfigProvider>
  </StrictMode>,
)
