import React from 'react'
import { membersList } from './Constants';
import CustomerRewards from './CustomerRewards';
function main(props){
    return(
        <CustomerRewards membersList = {membersList} />
    )
}
export default main;