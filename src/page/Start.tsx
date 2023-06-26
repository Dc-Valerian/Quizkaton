import {useState} from "react"
import styled from 'styled-components'
// import data from "../Utils/Question"
import { NavLink } from "react-router-dom"


const data = [
    {id:1, Question: "1 + 0", answer: "1"},
      {id:2, Question: "2 + 2", answer: "4"},
      {id:3, Question: "3 + 5", answer: "8"},
     { id:4, Question: "9 + 11", answer: "20"},
      {id:5, Question: "0 + 3", answer: "3"},
      {id:6, Question: "0 * 9", answer: "0"},
      {id:7, Question: "10 + 6", answer: "16"},
      {id:8, Question: "12 + 8", answer: "20"},
    
  ]

  
  const [question, setQuestion] = useState("");

  const Getonequestion = (id: any) => {
    const pic = data
      .filter((el: any) => el?.id === id)
      .map((el) => el?.Question)
      .toString();
console.log(setQuestion(pic));  };

const Start = () => {


//     const [pick, setPick] = useState<number>()

    
//   const [pictureState, setPictureState] = useState("");

//   const getsinglepicture = (id: any) => {
//     const pic = data
//       .filter((el: any) => el?.id === id)
//       .map((el) => el?.Question)
//       .toString();
//     setPictureState(pic);
//   };
  return (
    <div>
 <Container>
    <div>
    {/* {data[pick] -1?.id})  {data[pick]-1?.Question} */}

    </div>

 <Input placeholder='Enter your Question here Please '
//  value={pick}
//  onChange={(e:any)=>{
//     setPick(e.target.value)
//     setPictureState(e.target.value)
//  }}
 />

<div>
    {/* {data?.map((el:any)=>(
        <div
        // onChange={(el:any)=>{
        //     setPick(el.target.value)
        //     setPictureState(el.target.value)
        //  }}
        >
            question
        </div>
    ))} */}
</div>

<Button

onClick={(el: any) => {
    Getonequestion(el?.id);
  }}>
          Done
 </Button>


 </Container>
    </div>
  )
}

export default Start

const Button = styled.button`
    padding: 10px 18px;
background-color: black;
color: white;
border-radius:4px;
margin: 10px;
`

const Input = styled.input`
width: 300px;
height: 50px;
border: 1px solid silver;
border-radius:3px;
outline: none;
margin-left: 30px
`

const Container = styled.div`
padding-top: 80px;
display: flex;
flex-direction: column;
`