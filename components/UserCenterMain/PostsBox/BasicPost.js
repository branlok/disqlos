import React from 'react'
import PortfolioCard from './PortfolioCard';
import ContentBody from "./ContentBody";
import Settings from './Settings';
function BasicPost() {
    return (
        <div className="h-full px-2 mb-2 bg-custom-pink-300 rounded-md shadow-md flex child last:mb-0 transition relative">
            <PortfolioCard/>
            <ContentBody/>
            <Settings/>
        </div>
    )
}

export default BasicPost
