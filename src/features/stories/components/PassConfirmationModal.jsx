import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material"
import { useLanguage } from "@/shared/context/LanguageContext"

import PillButton from "@/shared/components/ui/buttons/PillButton"

const PassConfirmationModal = ({ open, onResult }) => {
  const { t } = useLanguage()
  const [reportReason, setReportReason] = useState(null)

  const handleConfirm = () => {
    onResult(true) // Confirmed pass
    setReportReason(null)
  }

  const handleCancel = () => {
    onResult(false) // Cancelled
    setReportReason(null)
  }

  const handleReasonToggle = () => {
    setReportReason(
      reportReason === "inappropriate_language"
        ? null
        : "inappropriate_language",
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, fontWeight: "bold" }}>
        {t.catSpeak.passConfirmationTitle}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ py: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={reportReason === "inappropriate_language"}
                onChange={handleReasonToggle}
                sx={{
                  color: "#990011",
                  "&.Mui-checked": {
                    color: "#990011",
                  },
                }}
              />
            }
            label={t.catSpeak.inappropriateLanguage}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ gap: 1 }}>
        <PillButton onClick={handleCancel} variant="text" color="inherit">
          {t.catSpeak.cancel}
        </PillButton>
        <PillButton onClick={handleConfirm}>{t.catSpeak.confirm}</PillButton>
      </DialogActions>
    </Dialog>
  )
}

export default PassConfirmationModal
