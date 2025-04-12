export async function fetchMangaList() {
    try {
        const response = await fetch("http://localhost:3000/manga/all")
        if (!response.ok) {
            throw new Error("Hiba a manga adatok lekérésekor!")
        }
        await console.log(response.json())
        return await response.json()
    }catch (error) {
        console.error(error)
        return[];
    }
}