const baseUrl = 'https://localhost:5001/api/userprofile';

export const getUserByEmail = (email) => {
    return fetch(`${baseUrl}/GetByEmail?email=${email}`).then(res => res.json())
}

export const registerUser = (userObj) => {
    return fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
}