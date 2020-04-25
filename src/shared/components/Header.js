import React from 'react'

// <Header tite="Users">Children</Header>

const Header = (prop) => {
    return (
        <div className="mt-4 mb-4 d-flex justify-content-between">
            <h1>{prop.title}</h1>
            <div>
                {prop.children}
            </div>
        </div>
    )
}

export default Header
