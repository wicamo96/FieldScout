import { useState } from "react"
import { Card, CardBody, CardTitle } from "reactstrap"


export const Login = () => {
    const [email, setEmail] = useState("john@example.com")

    return (
        <>
            <main>
                <h1>Field Scout</h1>
                <section>
                    <form>
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
                                        onChange={(e)}
                                        />
                                    </div>
                                </fieldset>
                            </CardBody>
                        </Card>
                    </form>
                </section>
            </main>
        </>
    )
}