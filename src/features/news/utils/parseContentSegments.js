export function parseContentSegments(sanitizedHtml) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(sanitizedHtml, "text/html")

  const carouselEls = doc.querySelectorAll(".cms-carousel")
  if (carouselEls.length === 0) {
    return [{ type: "html", content: sanitizedHtml }]
  }

  const PLACEHOLDER_PREFIX = "<!--__CMS_CAROUSEL_"
  const carouselData = []

  carouselEls.forEach((el, idx) => {
    const imgs = []
    el.querySelectorAll("img").forEach((img) => {
      imgs.push({
        src: img.getAttribute("src") || "",
        alt: img.getAttribute("alt") || "carousel image",
      })
    })
    carouselData.push(imgs)

    const placeholder = doc.createComment(`__CMS_CAROUSEL_${idx}__`)

    const parent = el.parentElement
    if (parent && parent.tagName === "P") {
      parent.replaceWith(placeholder)
    } else {
      el.replaceWith(placeholder)
    }
  })

  const modifiedHtml = doc.body.innerHTML

  const segments = []
  let remaining = modifiedHtml

  for (let idx = 0; idx < carouselData.length; idx++) {
    const marker = `${PLACEHOLDER_PREFIX}${idx}__-->`
    const markerPos = remaining.indexOf(marker)

    if (markerPos === -1) {
      continue
    }

    const before = remaining.substring(0, markerPos).trim()
    if (before) {
      segments.push({ type: "html", content: before })
    }

    segments.push({
      type: "carousel",
      content: "",
      images: carouselData[idx],
    })

    remaining = remaining.substring(markerPos + marker.length)
  }

  const tail = remaining.trim()
  if (tail) {
    segments.push({ type: "html", content: tail })
  }

  return segments
}
