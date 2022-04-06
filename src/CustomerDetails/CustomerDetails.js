import React from 'react'
function CustomerDetails(props) {
    const { details } = props
    return (
        <div>
            {details.map((ele, i) => (
                <div key={i} className={'memeber'}>
                    <h1>Full Name: {ele.name}</h1>
                    <h1>MemberShip code: {ele.memberShipCode}</h1>
                    <h2>January : {ele.january}</h2>
                    <h2>February : {ele.february}</h2>
                    <h2>March : {ele.march}</h2>
                    <h2>Total available rewards: {ele.total}</h2>
                </div>
            ))}
        </div>
    )
}

export default CustomerDetails;