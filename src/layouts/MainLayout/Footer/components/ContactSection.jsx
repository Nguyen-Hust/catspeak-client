import React, { useState } from "react"
import Send from "@mui/icons-material/Send"
import { useLanguage } from "@/shared/context/LanguageContext.jsx"
import { Typography, TextField } from "@mui/material"
import { colors } from "@/shared/utils/colors"
import InDevelopmentModal from "@/shared/components/ui/InDevelopmentModal"

const ContactSection = () => {
  const { t } = useLanguage()
  const footerText = t.footer
  const [showDevModal, setShowDevModal] = useState(false)

  return (
    <div className="flex-1 w-full flex flex-col items-center lg:items-end">
      <Typography
        variant="subtitle1"
        className="font-bold uppercase text-center tracking-wide w-full max-w-md"
        sx={{ marginBottom: 2 }}
      >
        {footerText.contactUs}
      </Typography>

      <div className="w-full max-w-md">
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row">
            <TextField
              type="email"
              placeholder={footerText.emailPlaceholder}
              variant="outlined"
              fullWidth
              inputProps={{
                style: {
                  fontSize: "16px", // Prevents iOS zoom on focus
                },
              }}
              className="flex-1"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 48,
                  borderRadius: "9999px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: colors.border,
                  },
                  "&:hover fieldset": {
                    borderColor: colors.red[700],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.red[700],
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: { xs: "12px 20px", sm: "10px 20px" },
                  fontSize: "16px",
                },
              }}
            />
            <TextField
              placeholder={footerText.namePlaceholder}
              variant="outlined"
              fullWidth
              inputProps={{
                style: {
                  fontSize: "16px", // Prevents iOS zoom on focus
                },
              }}
              className="flex-1"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 48,
                  borderRadius: "9999px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: colors.border,
                  },
                  "&:hover fieldset": {
                    borderColor: colors.red[700],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.red[700],
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: { xs: "12px 20px", sm: "10px 20px" },
                  fontSize: "16px",
                },
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <TextField
              placeholder={footerText.contactPlaceholder}
              variant="outlined"
              fullWidth
              inputProps={{
                style: {
                  fontSize: "16px", // Prevents iOS zoom on focus
                },
              }}
              className="flex-1"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 48,
                  borderRadius: "9999px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: colors.border,
                  },
                  "&:hover fieldset": {
                    borderColor: colors.red[700],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.red[700],
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: { xs: "12px 20px", sm: "10px 20px" },
                  fontSize: "16px",
                },
              }}
            />
            <button
              type="button"
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-300 text-[#bc1e46] shadow-lg transition hover:scale-105"
              aria-label={footerText.sendContact}
              onClick={() => setShowDevModal(true)}
            >
              <Send sx={{ fontSize: 20 }} />
            </button>
          </div>
          <InDevelopmentModal
            open={showDevModal}
            onCancel={() => setShowDevModal(false)}
          />
        </form>

        <div className="mt-4 flex items-center text-sm text-white/90">
          <div className="flex-1 text-center sm:text-left italic text-white/90">
            <Typography
              variant="body2"
              component="span"
              className="font-bold text-base"
            >
              Cat Speak{" "}
            </Typography>

            <Typography variant="body2" component="span" className="text-sm">
              {footerText.contactMessage}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
