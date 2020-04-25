import React from 'react'

//<TabPane active=true tab="home"> Children </TabPane>
const TabPane = (prop) => {
    return (
        <div class={`tab-pane fade ${prop.active && 'show active'}`} id={prop.tab} role="tabpanel" aria-labelledby={`${prop.tab}-tab`} >
            {prop.children}
        </div>
    )
}

export default TabPane