import React from 'react'

const HelpCenter = ({questions})=> {
  return (
    <div>{questions.title}
    <p>{questions._type}</p>
    </div>
  )
}

export default HelpCenter