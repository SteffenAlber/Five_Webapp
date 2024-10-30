import React from "react";
import Hero from "./Hero";
import Benefits from "./Benefits";
import Introducing from "./Introducing";
import CTA from "./CTA";
import Comments from "./Comments";
import Highlights from "./Highlights";
import Layout from '../layout/Layout'


const LandingPage = () => {
  return (
    <div>
      <Layout page={"homepage"} > 
      <Hero />
      <Benefits />
      <Introducing />
      <Highlights />
      <Comments />
      <CTA />
      </Layout>   
    </div>
  );
};

export default LandingPage;
