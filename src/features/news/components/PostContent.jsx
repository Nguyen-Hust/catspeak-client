import { useMemo } from "react"
import DOMPurify from "dompurify"
import { CmsCarousel } from "./CmsCarousel"
import { parseContentSegments } from "../utils/parseContentSegments"
import { CONTENT_CLASSES } from "../constants/contentClasses"

const PostContent = ({ html, className = "" }) => {
  const segments = useMemo(() => {
    const sanitized = DOMPurify.sanitize(html, {
      ADD_ATTR: [
        "style",
        "width",
        "height",
        "border",
        "cellpadding",
        "cellspacing",
        "class",
      ],
    })
    return parseContentSegments(sanitized)
  }, [html])

  return (
    <div className={`${CONTENT_CLASSES} ${className}`}>
      {segments.map((seg, i) =>
        seg.type === "carousel" && seg.images ? (
          <CmsCarousel key={`carousel-${i}`} images={seg.images} />
        ) : (
          <div
            key={`html-${i}`}
            dangerouslySetInnerHTML={{ __html: seg.content }}
          />
        ),
      )}
    </div>
  )
}

export default PostContent
