/**
 * Maps API field names to form field names used in the registration form.
 */
const FIELD_MAP = {
  Username: "username",
  Email: "email",
  DateOfBirth: "dateOfBirth",
  PreferredLanguage: "preferredLanguage",
  Password: "password",
  Country: "country",
}

/**
 * Maps API field names to translation keys in authText for validation errors.
 */
const FIELD_TRANSLATION_MAP = {
  Username: "validationUsernameRequired",
  Email: "validationEmailRequired",
  DateOfBirth: "validationDobRequired",
  PreferredLanguage: "validationLanguageRequired",
  Password: "validationPasswordRequired",
  Country: "validationCountryRequired",
}

/**
 * Parses a registration API error response and returns either
 * field-level errors or a general error message.
 *
 * @param {object} err - The error object from the API call
 * @param {object} authText - The auth translation object
 * @returns {{ fieldErrors: object|null, message: string|null }}
 */
export const parseRegisterError = (err, authText) => {
  const apiErrors = err?.data?.errors

  if (apiErrors && typeof apiErrors === "object") {
    const mapped = {}
    for (const [key, messages] of Object.entries(apiErrors)) {
      const field = FIELD_MAP[key]
      if (field) {
        // Use translated message if available, otherwise fall back to API message
        const translationKey = FIELD_TRANSLATION_MAP[key]
        mapped[field] =
          (translationKey && authText[translationKey]) ||
          (Array.isArray(messages) && messages[0]) ||
          ""
      }
    }
    if (Object.keys(mapped).length > 0) {
      return { fieldErrors: mapped, message: null }
    }
  }

  return {
    fieldErrors: null,
    message:
      err?.data?.message || err?.data?.title || authText.registrationFailed,
  }
}
