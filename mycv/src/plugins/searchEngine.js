import { computed } from 'vue'

// Example usage: const { filteredContent: filteredProjects } = useSearch(projects, searchText)
// Filters the given API content and returns only valid results removes invalid
export default function useSearch(content, searchQuery) {
  const filteredContent = computed(() => {
    if (!searchQuery.value) {
      return content.value
    } else {
      return content.value.filter(
        contentItem =>
          contentItem.fields.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          contentItem.fields.category.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }
  })

  return {
    content,
    searchQuery,
    filteredContent,
  }
}