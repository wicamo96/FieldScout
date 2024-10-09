const baseUrl = "https://localhost:5001/api/Bays"

export const getBaysByHouseId = (houseId) => {
    return fetch(`${baseUrl}/GetByHouseId?houseId=${houseId}`).then(res => res.json())
}