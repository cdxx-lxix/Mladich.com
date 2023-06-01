import client from "./contentful"
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useRouter } from 'vue-router'

// Example call: fetchContent('guides', 'fields.title, fields.slug, fields.imageHeader, fields.category, fields.shortText')
// Makes an API call to load all content of specific content type. Used in: Projects, Guides, About me.
export const fetchContent = async (contentType, fields) => {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      select: fields,
      locale: localStorage.getItem("content"),
    })
    return response.items
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Example call: fetchOne('guides', props.slug)
// Makes an API call to load a specific entry via slug field. Used in: Project page, Guide page.
export const fetchOne = async (contentType, slug) => {
  const router = useRouter()
  try {
    const response = await client.getEntries({
      content_type: contentType,
      "fields.slug": slug,
      locale: localStorage.getItem("content"),
    })
    if (response.items.length > 0) {
      return { contentBody: response.items[0].fields, convertedText: documentToHtmlString(response.items[0].fields.fullText) }
    } else {
      router.push({ name: '404', params: { catchAll: 'not-found' } })
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
