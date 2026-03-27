import React, { useState } from "react"
import { FiChevronDown } from "react-icons/fi"
import { useLanguage } from "@/shared/context/LanguageContext.jsx"

const SettingsContent = () => {
  const { language, toggleLanguage } = useLanguage()
  const [timezone, setTimezone] = useState("GMT+07:00")
  const [studyReminder, setStudyReminder] = useState(true)
  const [learnLanguage, setLearnLanguage] = useState("China")
  const [theme, setTheme] = useState("Auto")

  const timezones = [
    { value: "GMT+07:00", label: "(GMT+07:00) Ho Chi Minh" },
    { value: "GMT+08:00", label: "(GMT+08:00) Beijing" },
    { value: "GMT+09:00", label: "(GMT+09:00) Tokyo" },
  ]

  const languages = ["English", "Tiếng Việt", "中文"]
  const learnLanguages = ["China", "English", "Japan"]
  const themes = ["Auto", "Light", "Dark"]

  return (
    <div className="flex-1 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="space-y-8">
        {/* Notifications Section */}
        <section>
          <h2 className="mb-6 text-xl font-bold text-[#990011]">
            Notifications
          </h2>
          <div className="space-y-4">
            {/* Time zone */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <label className="text-sm font-medium text-gray-700">
                Time zone
              </label>
              <div className="relative">
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-sm text-gray-700 focus:border-[#990011] focus:outline-none focus:ring-1 focus:ring-[#990011]"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Study Reminder */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <label className="text-sm font-medium text-gray-700">
                Study Reminder
              </label>
              <button
                type="button"
                onClick={() => setStudyReminder(!studyReminder)}
                className={[
                  "relative inline-flex h-6 w-11 items-center rounded-full transition",
                  studyReminder ? "bg-blue-500" : "bg-gray-300",
                ].join(" ")}
                aria-pressed={studyReminder}
              >
                <span
                  className={[
                    "h-5 w-5 transform rounded-full bg-white shadow transition",
                    studyReminder ? "translate-x-5" : "translate-x-1",
                  ].join(" ")}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section>
          <h2 className="mb-6 text-xl font-bold text-[#990011]">Appearance</h2>
          <div className="space-y-4">
            {/* Language */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <label className="text-sm font-medium text-gray-700">
                Language
              </label>
              <div className="relative">
                <select
                  value={
                    language === "vi"
                      ? "Tiếng Việt"
                      : language === "en"
                        ? "English"
                        : "中文"
                  }
                  onChange={(e) => {
                    const val = e.target.value
                    if (val === "English" && language !== "en") toggleLanguage()
                    if (val === "Tiếng Việt" && language !== "vi")
                      toggleLanguage()
                  }}
                  className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-sm text-gray-700 focus:border-[#990011] focus:outline-none focus:ring-1 focus:ring-[#990011]"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Language you learn */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <label className="text-sm font-medium text-gray-700">
                Language you learn
              </label>
              <div className="relative">
                <select
                  value={learnLanguage}
                  onChange={(e) => setLearnLanguage(e.target.value)}
                  className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-sm text-gray-700 focus:border-[#990011] focus:outline-none focus:ring-1 focus:ring-[#990011]"
                >
                  {learnLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <label className="text-sm font-medium text-gray-700">Theme</label>
              <div className="relative">
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-sm text-gray-700 focus:border-[#990011] focus:outline-none focus:ring-1 focus:ring-[#990011]"
                >
                  {themes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Delete Account Section */}
        <section>
          <div className="rounded-lg bg-[#990011] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  Delete your account
                </h3>
                <p className="text-sm text-white/90">
                  This action will delete all your data and cannot be undo.
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg bg-[#f5c518] px-6 py-2 text-sm font-semibold text-gray-900 transition hover:bg-[#f4ab1b]"
              >
                Delete account
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingsContent
