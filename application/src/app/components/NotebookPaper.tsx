import React from 'react'

type props = {
    children?: React.ReactNode
}

const NotebookPaper = ({ children }: props) => {
  return (
    <div>{children}</div>
  )
}

export default NotebookPaper