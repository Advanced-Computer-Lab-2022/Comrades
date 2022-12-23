import Button from 'react-bootstrap/Button';


const Contract = () => {

    return (
        <>
            <div style={{margin:"200px 0px 0px 180px"}}>

                <h2>
                    By clicking I agree below, you agree to the following contract:
                </h2>
                <br></br>
                <h6>
                    - All the right to the posted videos & materials.
                </h6>
                <h6>
                    - 50% of the revenue from the courses goes to Comrades.
                </h6>

                <br></br>
                <br></br>
                <Button href="/inst" variant="dark">
                    I Agree
                </Button>
            </div>
        </>

    )



}
export default Contract
