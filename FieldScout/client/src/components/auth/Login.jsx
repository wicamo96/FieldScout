import { Button } from "reactstrap"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardBody, CardTitle } from "reactstrap"
import { getUserByEmail } from "../../services/UserServices.jsx"


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
            <main>
                <h1>Field Scout</h1>
                <section>
                    <form onSubmit={handleLogin}>
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <h2>Please Sign In</h2>
                                </CardTitle>
                                <fieldset>
                                    <div>
                                        <input 
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
                                        <Button>Sign In</Button>
                                    </div>
                                </fieldset>
                            </CardBody>
                        </Card>
                    </form>
                </section>
                <section>
                    <Link to="/register">Not A Member?</Link>
                </section>
            </main>
        </>
    )
}