import React from 'react'
import Dev from '../../img/Dev.png';
export default function Footer() {
    return (
        <footer className="navb text-white mt-5 p-4 text-center" id="#footer">
             Copyright &copy; {new Date().getFullYear()} <img className=' brand-logo ' style={{heigth:'40px',width:'40px'}} src={Dev} alt="logo"/><span className='text-warning'>Hub</span> 
        </footer> 
    )
}
