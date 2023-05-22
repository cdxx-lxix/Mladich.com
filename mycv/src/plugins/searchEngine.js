export default function useSearch(content, searchQuery) {
    if (!searchQuery) {
        return content
    } else {
        return content.filter(
            contentItem => 
            contentItem.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            contentItem.fields.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }
}