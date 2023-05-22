import client from './contentful'

// Example of the call: fetchContent('guides', 'fields.title, fields.slug, fields.imageHeader, fields.category, fields.shortText')
// Unified function for API requests. Used in: Projects, ProjectPage, Guides, GuidePage
const fetchContent = async (contentType, fields) => {
    try {
      const response = await client.getEntries({
        content_type: contentType,
        select: fields,
        locale: localStorage.getItem('content')
      })
      return response.items
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  export default fetchContent