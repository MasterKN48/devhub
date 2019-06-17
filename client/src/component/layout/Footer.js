import React from 'react'
import Dev from '../../img/Dev.png';
export default function Footer() {
    return (
        <div>
           <footer style={{bottom:0,width:'100%'}} className="bg-dark text-white mt-5 p-4 text-center">
             Copyright &copy; {new Date().getFullYear()} <img className=' brand-logo ' style={{heigth:'40px',width:'40px'}} src={Dev} alt="logo"/>Hub 
            </footer> 
        </div>
    )
}
