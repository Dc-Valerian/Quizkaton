import styled from "styled-components"
import img1 from "../../assets/leaf.png"
import img2 from "../../assets/cup.png"
import img3 from "../../assets/laptop.png"
import img4 from "../../assets/logo.png"
import { NavLink } from "react-router-dom"

const StartPage = () => {
  return (
    <div>
      <Container>
        <Image1 src={img1} />
        <Image2 src={img2} />
        <Image3 src={img3} />
        {/* <Image4 src={img4}/> */}

        <Hold>
          <Wrap>
            <Logo>
              <Pic src={img4} />
            </Logo>
            <Text>
              <Main>
                AJEGUNLE HIGH SCHOOL HACKathon
              </Main>
              <Minor>
                The Search For The Greatest Mind
              </Minor>
              <ButtonHold>
                <NavLink to="start" style={{ textDecoration: "none", color: "white" }} >
                  <Button>
                    Let's Do This
                  </Button>
                </NavLink>

              </ButtonHold>
            </Text>
          </Wrap>
        </Hold>
      </Container>
    </div>
  )
}

export default StartPage


const Button = styled.div`
height: 40px;
width: 135px;
display: flex;
align-items: center;
justify-content: center;
background-color: #306CC6;
border-radius: 5px;
font-size: 20px;
font-weight: 500;
color: white;

transition: all 380ms;

  
  :hover{
    cursor: pointer;
    transform: translate(0,-3px);
    color:#fff;
  }
`

const ButtonHold = styled.div`
margin-top: 70px;
display: flex;
flex-direction: row;
`

const Minor = styled.div`
color: white;
background-color: rgba(0,0,0,0);
font-size: 20px;
font-weight: 700;
text-transform: uppercase;
text-align: center;
margin-top: 2px;
`

const Main = styled.div`
color: #306CC6;
background-color: rgba(0,0,0,0);
font-size: 30px;
line-height: 37.5px;
font-weight: 700;
text-transform: uppercase;
`

const Text = styled.div`
margin-top: 20px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`

const Pic = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`

const Logo = styled.div`
/* background-color: yellow; */
width: 800px;
height: 180px;
/* margin-bottom: 40px; */
`
const Wrap = styled.div`
    display: flex;
    /* background-color: purple; */
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
    height: 100%;
`

const Hold = styled.div`
width: 900px;
/* background-color: red; */
height: 400px;
display: flex;
align-items: center;
/* flex-direction: column; */
justify-content: center;
`

// const Image4 = styled.img`
// object-fit: cover;
// width: 350px;
// height:350px;

// position: absolute;
// left: -10px;
// height: 190px;
// top: -75px;
// position: fixed;
// `

const Image3 = styled.img`
  position: absolute;
    right: 10px;
    height: 300px;
    top: 0;
    position: fixed;
`

const Image2 = styled.img`    
     position: absolute;
    right: -60px;
    height: 190px;
    bottom:0;
    position: fixed;

`

const Image1 = styled.img`

    position: absolute;
    left: 2px;
    height: 300px;
    bottom: -10px;
    position: fixed;

    -webkit-animation: mover 1s infinite alternate;
  animation: mover 1s infinite alternate;
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 1s infinite alternate;
  background-color: #001328;
  @-webkit-keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-5px);
    }
  }
  @keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
    
`

const Container = styled.div`
background-color: #141414;
width: 100vw;
height: 100vh;
position: relative;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
overflow: hidden;
`