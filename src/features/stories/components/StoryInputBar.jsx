import React from "react"
import { Send } from "lucide-react"
import { useLanguage } from "@/shared/context/LanguageContext"
import TextInput from "@/shared/components/ui/inputs/TextInput"

/**
 * Shared input bar for creating stories. Supports two visual variants.
 *
 * @param {Object} props
 * @param {string} props.inputValue
 * @param {(e: React.ChangeEvent) => void} props.onChange
 * @param {() => void} props.onSend
 * @param {number} props.myCount
 * @param {number} props.totalCount
 * @param {"default"|"empty"} [props.variant="default"]
 */
const StoryInputBar = ({
  inputValue,
  onChange,
  onSend,
  myCount,
  totalCount,
  variant = "default",
}) => {
  const { t } = useLanguage()
  const isEmpty = variant === "empty"

  return (
    <div
      className={
        isEmpty
          ? "flex flex-col md:flex-row items-center justify-between gap-3 px-2 pb-3 md:gap-0"
          : "mb-2 flex flex-col md:flex-row items-center justify-between gap-3 px-1 pt-1 -mx-1 -mt-1"
      }
    >
      <div
        className={
          isEmpty
            ? "flex w-full items-start gap-2 md:w-auto"
            : "flex w-full items-start gap-2"
        }
      >
        <TextInput
          value={inputValue}
          onChange={onChange}
          maxLength={200}
          placeholder={
            isEmpty
              ? t.catSpeak.mail.placeholderEmpty
              : t.catSpeak.mail.placeholder
          }
          containerClassName="flex-1 md:w-72 md:flex-none"
          className={
            isEmpty
              ? "!border-[#c38300]/70 focus:!border-[#990011] focus:!ring-[#990011] hover:!border-[#990011]"
              : "!border-[#c38300]/70"
          }
          showCount
        />
        <button
          type="button"
          onClick={onSend}
          className={
            isEmpty
              ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#990011] transition hover:scale-105 hover:bg-[#990011]/10"
              : "flex h-10 w-10 items-center justify-center rounded-full text-[#990011] hover:bg-[#E5E5E5]"
          }
          aria-label="Send message"
        >
          <Send />
        </button>
      </div>

      <div
        className={
          isEmpty
            ? "shrink-0 text-xs text-[#7A7574]"
            : "text-sm whitespace-nowrap"
        }
      >
        <span className="font-semibold">{myCount}</span>{" "}
        {t.catSpeak.mail.yours} |{" "}
        <span className="font-semibold">{totalCount}</span>{" "}
        {t.catSpeak.mail.total}
      </div>
    </div>
  )
}

export default StoryInputBar
