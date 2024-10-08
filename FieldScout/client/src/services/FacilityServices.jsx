const baseUrl = `https://localhost:5001/api/facilities`

export const getAllFacilities = () => {
    return fetch(`${baseUrl}`).then(res => res.json())
}