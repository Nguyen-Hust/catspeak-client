import { Dialog, DialogTitle, DialogContent, Box } from "@mui/material"
import { FiX } from "react-icons/fi"
import { getPolicyComponent } from "./policies"
import { useLanguage } from "@/shared/context/LanguageContext"

const PolicyModal = ({ open, onClose, title }) => {
  const { t } = useLanguage()
  // Get the appropriate policy component based on title
  const PolicyComponent = getPolicyComponent(title)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          padding: 2,
          maxHeight: "90vh",
        },
      }}
    >
      <Box component="div">
        <button
          type="button"
          aria-label="Close"
          className="absolute right-6 top-6 z-10 text-2xl text-gray-500 transition hover:text-gray-700"
          onClick={onClose}
        >
          <FiX />
        </button>

        <DialogTitle
          sx={{
            textAlign: "center",
            color: "#8f0d15",
            fontSize: "1.5rem",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            paddingBottom: 2,
            paddingRight: 6,
          }}
        >
          {title}
        </DialogTitle>

        <DialogContent
          sx={{
            maxHeight: "70vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#8f0d15",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#6b0a10",
            },
          }}
        >
          {PolicyComponent ? (
            <PolicyComponent />
          ) : (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-lg text-gray-600 font-medium">
                {t.comingSoon.badge}
              </p>
            </div>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default PolicyModal
