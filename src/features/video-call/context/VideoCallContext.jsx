/**
 * VideoCallContext — backward-compatibility re-export.
 *
 * The actual context and provider logic now live in
 * GlobalVideoCallProvider.jsx, which wraps the entire app so the
 * LiveKit connection persists across route changes (PiP feature).
 *
 * This file re-exports the context and hook so that every existing
 * component that imports `useVideoCallContext` keeps working without
 * any import changes.
 */

export {
  VideoCallContext,
  useGlobalVideoCall as useVideoCallContext,
} from "./GlobalVideoCallProvider"
