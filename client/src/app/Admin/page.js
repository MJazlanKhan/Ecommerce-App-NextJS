'use client'
import Header from "@/Components/AdminComponents/Header";
import Main from "@/Components/AdminComponents/Main";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import './Style.css'
export default function Home() {
  const type = localStorage.getItem('type')
  return (
    <div>
      {type === 'admin' && <>
        <div style={{ padding: "15px 25px" }}>
          {/* <Sidebar/> */}
          <Header />
          <Main />
        </div>
      </>}
    </div>
  );
}
