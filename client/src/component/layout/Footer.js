import React from 'react'

export default function Footer() {
    return (
        <div>
           <footer style={{bottom:0,width:'100%'}} className="bg-dark text-white mt-5 p-4 text-center">
             Copyright &copy; {new Date().getFullYear()} DevHub 
            </footer> 
        </div>
    )
}
