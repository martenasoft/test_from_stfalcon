'use client'
import "../styles/globals.css"
import Layout from "../components/common/Layout"
import type {AppProps} from "next/app"
import type {DehydratedState} from "react-query"
import {useEffect, useState} from "react";
import Toast from "../components/common/Toast";


function MyApp({Component, pageProps}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [items, setItems] = useState(['']);

  useEffect(() => {
    // Perform localStorage action
    const url = new URL('https://localhost/.well-known/mercure');
    url.searchParams.append('topic', 'https://localhost/message/0');
    const eventSource = new EventSource(url);
    let items_:any[] = [];
    eventSource.onmessage = function ({data}) {
      const newItem = JSON.parse(data).status;

      items_ = [...items_, newItem];
      items_ = items_.filter((value: string, index: number, self: any) => {
        return self.indexOf(value) === index;
      });
      setItems(items_);
      setTimeout(() => {
        setItems([]);
        items_ = [];
      }, 8000);
    };
  }, [])



  return <Layout dehydratedState={pageProps.dehydratedState}>
    <div id="messages" className="fixed z-10 bottom-0 right-0  h-3/4 items-center justify-center">
      {items.map((item, index) => (
        item != '' ? (<Toast key={index} message={item} id={"toast-" + index}/>) : ''
      ))}
    </div>

    <Component {...pageProps} />
  </Layout>
}

export default MyApp
