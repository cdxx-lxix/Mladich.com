export const useShare = (url, title) => {
  let constructedUrl = window.location.href + "/" + url
  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: constructedUrl,
      })
      .catch(console.error)
  } else {
    // Fallback for desktop devices (copy URL to clipboard)
    navigator.clipboard
      .writeText(constructedUrl)
      .then(() => {
        console.log("URL copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err)
      })
  }
}
