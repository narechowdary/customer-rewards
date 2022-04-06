import React, { useEffect, useState } from 'react'
import { Customer_1_Transactions, Customer_2_Transactions, Customer_3_Transactions } from './Constants'
import RewardDetails from './RewardDetails'
// sample API to make an service call
const endpoint = 'https://jsonplaceholder.typicode.com/todos/1'
// Identify month name from List
const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function CustomerRewards(props) {
    const { membersList } = props
    const [customerTransactions, setCustomerTransactions] = useState({})
    useEffect(() => {
        const apiResponse = {}
        if (Array.isArray(membersList) && membersList.length > 0) {
            membersList.forEach(member => {
                getList(member, apiResponse);
            })
        }
    }, [])

    // Make API calls asynchronous
    const getList = async (member, apiResponse) => {
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                membership: member.membershipCode
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            // customer-1 to 3 hard coded values assignment
            if (member.membershipCode === 'AXJ9574556')
                apiResponse[member.membershipCode] = getTransData(Customer_1_Transactions, member)
            if (member.membershipCode === 'AXJ9574590')
                apiResponse[member.membershipCode] = getTransData(Customer_2_Transactions, member)
            if (member.membershipCode === 'AXJ9574467')
                apiResponse[member.membershipCode] = getTransData(Customer_3_Transactions, member)
            if (Object.keys(apiResponse).length === 3) 
                setCustomerTransactions(apiResponse)
        }).catch(error => {
            console.error('getTransactions service failed with: ', error)
        })
    }

    const getTransData = (customerTransactions, memeberDetails) => {
        return {
            customerName: memeberDetails.name,
            memeberShip: memeberDetails.membershipCode,
            transactions: getCustomerTransList(customerTransactions)
        }
    }

    const getCustomerTransList = (transactions) => {
        return transactions.map(ele => {
            const convertedDateIndex = new Date(ele.transactionDate).getMonth();
            return {
                monthName: monthList[convertedDateIndex],
                ...ele
            }
        })
    }
    return (
        <RewardDetails customerTransactions={customerTransactions} />
    )
}

export default CustomerRewards;