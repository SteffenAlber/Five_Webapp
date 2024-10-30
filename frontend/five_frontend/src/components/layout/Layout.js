import React from "react";
import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children, page}) => {
    return (
        <>
            <Navigation pages={page}/>
            <main>{children}</main>
            <Footer />
        </>
    )
}
export default Layout;
