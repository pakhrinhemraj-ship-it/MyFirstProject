
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './section/Homesection/Header';
import Signup2 from './section/Form/Signup2';
import Layout from './section/Homesection/layout';
import Features from './section/Homesection/Features';
import Pricing from './section/Homesection/Pricing';
import Contact from './section/Homesection/Contact';
import Team from './section/Homesection/Team';
import Signup1 from "./section/Form/Signup1";


export default function Apps() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/header" element = { <Layout> <Header /> </Layout>}/>
            <Route path="/features" element = { <Layout> <Features /> </Layout>} />
            <Route path="/pricing" element = { <Layout> <Pricing /> </Layout>} />
            <Route path="/contact" element = { <Layout> <Contact/> </Layout>} />

            <Route path="/team" element = { <Layout> <Team /> </Layout>} />
            
            <Route path="/Login" element = { <Layout> <Signup1 /> </Layout>} />
            <Route path="/signup1" element = { <Layout> <Signup1 /> </Layout>} />
            <Route path="/signup2" element = { <Layout> <Signup2 /> </Layout>} />

        </Routes>
        </BrowserRouter>
    </div>
  )
}
