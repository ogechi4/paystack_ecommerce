import React from 'react'
import Hero from '../components/Hero'
import LastestCollection from '../components/LastestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

function Home() {
    return (
        <>
        <div className='mt-10'>
        <Hero />
        </div>
       
        <LastestCollection />
        <BestSeller />
        <OurPolicy />
        <NewsletterBox />
        </>
    )
}

export default Home
