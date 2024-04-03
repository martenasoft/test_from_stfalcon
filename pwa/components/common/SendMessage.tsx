import Link from "next/link";
import React, {useState} from "react";
import Image from "next/image";
const SendMessage = (
  {
    image
  }:{
    image: string
  })=> {
  const  handleLink = async () => {
    const message = prompt("Type some text for push message OR type 'error' to throw it one and log");

    // return;
    try {
      const response = await fetch('https://localhost/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
          'accept': 'application/ld+json'
        },
        body: JSON.stringify({'text': message})
      });

    } catch (error) {
      console.error(error)
    }
  }

  return   (

    <div  onClick={handleLink} className="w-full max-w-xs p-2 | sm:w-1/2 | lg:w-full lg:p-0">
      <a

        href='#'
        className="w-full flex items-center flex-col justify-center shadow-card p-3 min-h-24 transition-colors text-cyan-500 border-4 border-transparent hover:border-cyan-200 hover:text-cyan-700 | sm:flex-row sm:justify-start sm:px-5"
      >
        <Image src={image} width="50" height="50" alt="" />
        <h3 className="text-center text-base uppercase font-semibold leading-tight pt-3 | sm:text-left sm:pt-0 sm:pl-5">
          Send Message (task 1)
        </h3>
      </a>
    </div>
)
}

export default SendMessage;
