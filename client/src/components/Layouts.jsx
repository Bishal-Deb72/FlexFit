import React from 'react'
import Header from "./Header"
import Footer from "./Footer"

export const Layout = (props) => {
    return (
      <div>
          <Header/>
          <main style={{minHeight:"70vh"}}>
            {props.children}
          </main>
          <Footer/>
      </div>
    )
  }