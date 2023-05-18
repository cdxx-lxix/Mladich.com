import { createClient } from 'contentful'

const client = createClient({
    accessToken: import.meta.env.VITE_CTF_ACCESS_TOKEN,
    space: import.meta.env.VITE_CTF_SPACE_ID
})

export default client