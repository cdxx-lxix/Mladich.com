function snackbar() {
  return `
    <template>
        <v-snackbar v-model="snackbar" timeout="timeout">
            Copied!
            <template v-slot:actions>
                <v-btn color="blue" variant="text" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>
    </template>
    `
}

export const useShare = (url, title) => {
  let constructedUrl = window.location.href + "/" + url;
  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: constructedUrl,
      })
      .catch(console.error);
  } else {
    // Fallback for desktop devices (copy URL to clipboard)
    navigator.clipboard
      .writeText(constructedUrl)
      .then(() => {
        console.log("URL copied to clipboard")
        snackbar()
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err);
      });
  }
};
