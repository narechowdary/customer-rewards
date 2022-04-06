import React, { useEffect, useState } from 'react'
import CustomerDetails from './CustomerDetails';
function RewardDetails(props) {
    const [customerMonthlyRewards, setmonthlyRewards] = useState([]);
    const { customerTransactions } = props;

    // currently i'm Assuming January, February and March trasactions
    useEffect(() => {
        let customerRecords = []
        let janRewards = 0;
        let febRewards = 0;
        let marchRewards = 0;
        if (Object.keys(customerTransactions).length > 0) {
            Object.keys(customerTransactions).forEach(key => {
                const transactionsList = customerTransactions[key].transactions
                transactionsList.forEach(trans => {
                    switch (trans.monthName) {
                        case 'January':
                            janRewards = getMonthlyRewards(trans, janRewards);
                            break;
                        case 'February':
                            febRewards = getMonthlyRewards(trans, febRewards);
                            break;
                        case 'March':
                            marchRewards = getMonthlyRewards(trans, marchRewards);
                            break;
                        default:
                            break;
                    }
                })
                customerRecords.push({
                    name: customerTransactions[key].customerName,
                    memberShipCode: customerTransactions[key].memeberShip,
                    january: janRewards,
                    february: febRewards,
                    march: marchRewards,
                    total: janRewards + febRewards + marchRewards
                })
            });
            setmonthlyRewards(customerRecords);
        }
    }, [customerTransactions])

    // Calculate the rewards based on amount
    const getMonthlyRewards = (trans, monthlyRewards) => {
        let trasnAmount = Math.round(Number(trans.transactionAmount));
        if (trasnAmount >= 100) {
            let overAmount = trasnAmount - 100;
            monthlyRewards = monthlyRewards + 50;
            monthlyRewards = monthlyRewards + (2 * overAmount);
        }
        if (trasnAmount > 50 && trasnAmount < 100) {
            let overAmount = trasnAmount - 50;
            monthlyRewards = monthlyRewards + overAmount;
        }
        return monthlyRewards
    }

    return (
        <>
            {customerMonthlyRewards && customerMonthlyRewards.length > 0 && <CustomerDetails details={customerMonthlyRewards} />}
        </>

    )
}

export default RewardDetails;