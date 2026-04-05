import { useEffect } from "react"

/**
 * Module-level refs that bridge the Router's navigate/location into the
 * GlobalVideoCallProvider which lives ABOVE the RouterProvider.
 *
 * Components inside the router call `useRegisterNavigate(navigate, location)`
 * to keep these refs current. The global provider reads them via getNavigate()
 * and getLocation() when it needs to perform navigation (PiP transitions,
 * leaving a call, etc.).
 */
const navigateRef = { current: null }
const locationRef = { current: null }

/** Read the current navigate function (may be null before router mounts). */
export const getNavigate = () => navigateRef.current

/** Read the current location object (may be null before router mounts). */
export const getLocation = () => locationRef.current

/**
 * Call from any component inside the Router to register the navigate function.
 * Typically placed in a root layout rendered by the router.
 */
export const useRegisterNavigate = (navigate, location) => {
  useEffect(() => {
    navigateRef.current = navigate
    locationRef.current = location
  }, [navigate, location])
}
