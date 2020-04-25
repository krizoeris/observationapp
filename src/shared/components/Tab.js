import React from 'react'

// <Tab tabs="['Home', 'About']"> children </Tab>

const Tab = (prop) => {
    return (
        <div>
            <ul class="nav nav-tabs" role="tablist">
                {prop.tabs &&
                    prop.tabs.map(tab =>
                        <li class="nav-item">
                            <a 
                            class={(prop.tabs[0] === tab) ? "nav-link text-dark active" : "nav-link text-dark"} 
                            id={`${tab}-tab`} 
                            data-toggle="tab" 
                            href={`#${tab}`} role="tab" 
                            aria-controls={tab} 
                            aria-selected={(prop.tabs[0] === tab) ? "true" : "false"} >
                                {tab}
                            </a>
                        </li>
                    )
                }
            </ul>
            
            <div class="tab-content border bg-white">
                {prop.children}
            </div>
        </div>
    )
}

export default Tab
