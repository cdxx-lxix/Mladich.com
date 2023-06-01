import { computed } from "vue"

// Example usage: const { filteredContent: filteredProjects } = useSearch(projects, searchText)
// Filters the given API content and returns only valid results removes invalid
export function useSearch(content, searchQuery) {
  const filteredContent = computed(() => {
    if (!searchQuery.value) {
      return content.value
    } else {
      return content.value.filter(
        (contentItem) =>
          contentItem.fields.title
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          contentItem.fields.category
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
      )
    }
  })

  return {
    content,
    searchQuery,
    filteredContent,
  }
}

// Works with both category selected and search for text
export function useSearchFiltered(content, searchQuery, categoryFilter) {
  const filteredContent = computed(() => {
    if (!searchQuery.value && !categoryFilter.value) {
      return content.value
    } else {
      return content.value.filter((contentItem) => {
        const titleMatch = contentItem.fields.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
        const categoryMatch =
          contentItem.fields.category.toLowerCase() ===
          categoryFilter.value.toLowerCase()
        const noCategoryFilter = !categoryFilter.value

        return (
          (titleMatch && (categoryMatch || noCategoryFilter)) ||
          (noCategoryFilter && categoryMatch)
        )
      })
    }
  })

  return {
    content,
    searchQuery,
    categoryFilter,
    filteredContent,
  }
}
