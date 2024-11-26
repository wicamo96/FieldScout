import { Button } from "reactstrap"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardBody, CardTitle } from "reactstrap"
import { getUserByEmail } from "../../services/UserServices.jsx"
import './Auth.css'
import backgroundImage from '../../static/HostaPhoto.jpg'


export const Login = () => {
    const [email, setEmail] = useState("john@example.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        const tmp = email.replace(`@`, `%40`)
        const formattedEmail = tmp

        getUserByEmail(email).then(foundUser => {
            if (foundUser) {
                const user = foundUser
                localStorage.setItem(
                    "fieldScout_user",
                    JSON.stringify({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        facilityId: user.facilityId
                    })
                )
                navigate("/")
            } else {
                window.alert("Invalid Login")
            }
        })
    }

    return (
        <>
            <main className="background">
                <article className="backgroundImage" style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: `cover`,
                backgroundPosition: `center`
                }}>
                    <h1 className="clear">Field Scout</h1>
                    <section>
                        <form onSubmit={handleLogin}>
                            <Card className="loginCard">
                                <CardTitle>
                                    
                                </CardTitle>
                                <CardBody>
                                    <CardTitle>
                                        <h3>Please Sign In</h3>
                                    </CardTitle>
                                    <fieldset>
                                        <div>
                                            <input 
                                            className="marginSmall input"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email address"
                                            required
                                            autoFocus
                                            />
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div>
                                            <Button className="marginSmall greenButton">Sign In</Button>
                                        </div>
                                    </fieldset>
                                </CardBody>
                                <Link to="/register">Not A Member?</Link>
                            </Card>
                        </form>
                    </section>
                </article>
            </main>
        </>
    )
}