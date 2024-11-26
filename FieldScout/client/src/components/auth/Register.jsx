import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardTitle } from "reactstrap"
import { getAllFacilities } from "../../services/FacilityServices.jsx"
import { registerUser } from "../../services/UserServices.jsx"
import { Link, useNavigate } from "react-router-dom"
import backgroundImage from '../../static/SalviaPhoto.jpg'

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
        <main className="background">
            <article className="backgroundImage" style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: `cover`,
            backgroundRepeat: 'no-repeat',
            backgroundPositionY: `5%`
        }}>
                <h1 className="clear">Field Scout</h1>
                <section>
                    <form onSubmit={handleRegistration}>
                        <Card className="registerCard">
                            <CardTitle><h3>Please Register</h3></CardTitle>
                            <CardBody>
                                <fieldset>
                                    <div>
                                        <input
                                            onChange={(e) => {
                                                let copy = {...user}
                                                copy.name = e.target.value
                                                setUser(copy)
                                            }}
                                            className="input"
                                            type="text"
                                            id="name"
                                            placeholder="Enter Your Name"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                </fieldset>
                                <fieldset className="marginSmall">
                                    <div>
                                        <input 
                                            onChange={(e) => {
                                                let copy = {...user}
                                                copy.email = e.target.value
                                                setUser(copy)
                                            }}
                                            className="input"
                                            type="email"
                                            id="email"
                                            placeholder="Enter Your Email"
                                            required
                                        />
                                    </div>
                                </fieldset>
                                <fieldset className="marginSmall">
                                    <div>
                                        <select className="select" name="facilities" onChange={(e) => {
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
                                    <div className="marginSmall">
                                        <Button className="greenButton">Register!</Button>
                                    </div>
                                </fieldset>
                                <div className="marginSmall">
                                    <Link to="/login">Already A Member?</Link>
                                </div>
                            </CardBody>
                        </Card>
                    </form>
                </section>
            </article>
        </main>
    )
}