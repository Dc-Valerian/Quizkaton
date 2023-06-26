
import styled from 'styled-components'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'

const MainHead = () => {
   
    return (
        <div>
            <Container>
                <Main>
                    <Link to="/"><Logo src={logo} /></Link>

                    <Text>
                        Welcome
                    </Text>
                </Main>
            </Container>
        </div>
    )
}

export default MainHead

const Text = styled.div`
font-weight: 700;
font-size: 50px;
text-transform: uppercase;
margin-right: 500px;
`

const Logo = styled.img`
font-size: 20px;
font-weight: 700;
height:50px;

`



const Main = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width:90%;
`

const Container = styled.div`
display: flex;
justify-content: center;
width:100%;
background-color: black;
color:white;
height: 70px;
position: fixed;
z-index: 100
`