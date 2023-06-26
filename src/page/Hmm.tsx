import styled from "styled-components"
import {useState} from "react"



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

const Hmm = () => {
  const [pick, setPick] = useState<number>()
  const [newData, setNewData] = useState([])

  const filterData = (id:number) => {
    console.log(id)
    const getData:any = data.filter(el => el.id !== id)
    setNewData(getData)
  }

console.log(newData)
  
return (
	<div>
      <Container>
        <Main>
          {
            data.map(el => (
              <div><strong> {el?.id}. </strong>{el.Question}</div>
            ))
          }
          <br/>
          <br/>
          <br/>
        <div>Question Selected</div>
          <div>{data[pick] -1?.id})  {data[pick]-1?.Question}</div>

          <Input 
          placeholder="Enter your Choice"
          // type="number"
          value={pick}
          onChange={(e:any) => {
            setPick(e.target.value)
          }}
          />
          <Button
          onClick={() => {
            setPick()
          }}
          >Picked</Button>
          <Button
          onClick={() => {
            filterData(pick)
            setPick()
          }}
          >Done</Button>
        </Main>
      </Container>
    </div>
  )
}

export default Hmm



const Button = styled.div`
padding: 10px 18px;
background-color: black;
color: white;
border-radius:4px;
margin: 10px;
`


const Input = styled.input`
width: 100px;
height: 50px;
border: 1px solid silver;
border-radius:3px;
outline: none;
margin-left: 30px
`

const Main = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`

const Container = styled.div`
padding-top: 80px
`