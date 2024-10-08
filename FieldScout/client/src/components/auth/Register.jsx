import { useEffect, useState } from "react"
import { Button, Card, CardTitle } from "reactstrap"
import { getAllFacilities } from "../../services/FacilityServices.jsx"
import { registerUser } from "../../services/UserServices.jsx"
import { Link, useNavigate } from "react-router-dom"

export const Register = () => {
    const [user, setUser] = useState({})
    const [facilities, setFacilities] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        getAllFacilities().then(facilitiesArr => {
            setFacilities(facilitiesArr)
        })
    }, [])

    const handleRegistration = () => {
        registerUser(user).then(navigate("/login"))
    }

    if (!facilities.length)
    {
        return (
            <div>Loading</div>
        )
    }

    return (
        <main>
            <h1>Field Scout</h1>
            <section>
                <form onSubmit={handleRegistration}>
                    <Card>
                        <CardTitle>Please Register</CardTitle>
                        <fieldset>
                            <div>
                                <input
                                    onChange={(e) => {
                                        let copy = {...user}
                                        copy.name = e.target.value
                                        setUser(copy)
                                    }}
                                    type="text"
                                    id="name"
                                    placeholder="Enter Your Name"
                                    required
                                    autoFocus
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div>
                                <input 
                                    onChange={(e) => {
                                        let copy = {...user}
                                        copy.email = e.target.value
                                        setUser(copy)
                                    }}
                                    type="email"
                                    id="email"
                                    placeholder="Enter Your Email"
                                    required
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div>
                                <select name="facilities" onChange={(e) => {
                                    let copy = {...user}
                                    copy.facilityId = e.target.value
                                    setUser(copy)
                                }}>
                                    <option value="Select Your Facility" selected disabled>Select Your Facility</option>
                                    {facilities.map(facililty => {
                                        return <option value={facililty.id}>{facililty.name}</option>
                                    })}
                                </select>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div>
                                <Button>Register!</Button>
                            </div>
                        </fieldset>
                    </Card>
                </form>
            </section>
            <section>
                <Link to="/login">Already A Member?</Link>
            </section>
        </main>
    )
}