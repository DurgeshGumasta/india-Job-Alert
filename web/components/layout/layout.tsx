import header from "./header";
import Footer from "./footer";
import Header from "./header";
export default function Layout({children}:any){
    return (
        <>
        <Header/>
        <main className="container mx-auto p-4">{children}</main>
        <Footer/>
        </>
    )
}