import React from 'react'

// <Card class={shadow-md} body={true} classBody={p-0}>

const Card = (prop) => {
    return (
        <div class={(prop.class) ? 'card '+prop.class : 'card'}>
            {(!prop.body) ?
                <div class={(prop.classBody) ? 'card-body '+prop.classBody : prop.classBody}>
                    {prop.children}
                </div>
            : prop.children }
        </div>
    )
}

export default Card
