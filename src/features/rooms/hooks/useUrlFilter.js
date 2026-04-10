import { useSearchParams } from "react-router-dom"
import { useMemo, useCallback } from "react"

export const useUrlFilter = (paramName) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentValues = useMemo(() => {
    return searchParams.getAll(paramName)
  }, [searchParams, paramName])

  const toggleValue = useCallback(
    (value, isChecked) => {
      const newParams = new URLSearchParams(searchParams)

      // remove all existing values first
      newParams.delete(paramName)

      let newValues = [...currentValues]

      if (isChecked) {
        if (!newValues.includes(value)) {
          newValues.push(value)
        }
      } else {
        newValues = newValues.filter((v) => v !== value)
      }

      // append multiple params
      newValues.forEach((v) => newParams.append(paramName, v))

      newParams.set("page", "1")

      setSearchParams(newParams, { preventScrollReset: true })
    },
    [searchParams, currentValues, paramName, setSearchParams],
  )

  const isSelected = useCallback(
    (value) => currentValues.includes(value),
    [currentValues],
  )

  const clearAll = useCallback(() => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete(paramName)
    newParams.set("page", "1")
    setSearchParams(newParams, { preventScrollReset: true })
  }, [searchParams, paramName, setSearchParams])

  return {
    currentValues,
    toggleValue,
    isSelected,
    clearAll,
  }
}
