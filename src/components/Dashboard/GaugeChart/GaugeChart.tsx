import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from "react-chartjs-2"

import './GaugeChart.scss';
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { nameMonth } from "utils/constants";
import { useEffect, useRef, useState } from "react";
import { Transactions } from "@pages/Dashboard/DashboardTypes";
import { changeBudgetInfo } from "features/user/userSlice";

type Props = {
    currentDay : number,
    currentMonth: number,
    currentYear: number,
    receivedDate: Date,
    filteredTransactions: Transactions[]
}

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
)

const GaugeChart = ({currentDay, currentMonth, filteredTransactions, receivedDate}: Props) => {

    const {categoryLimits} = useAppSelector(({limits}) => limits);
    const dispatch = useAppDispatch();

    const currentDate = new Date();

    var totalBudget = 0;
    var totalExpense = 0;
    var totalRemains = 0;

    

    

    if(categoryLimits.length > 0){

        Object.entries(categoryLimits[0]).map(([name, value]:any) => (
            totalBudget += value
        ));
    }

    filteredTransactions.map(({price}:any) => (
        totalExpense += price
    ));
    
    if(totalExpense > totalBudget){
        totalRemains = 0;
        

    }
    else totalRemains = totalBudget - totalExpense;

    if(currentDate.getMonth() !== receivedDate.getMonth()){
        currentDay = new Date(receivedDate.getFullYear(), receivedDate.getMonth()+1,0).getDate();
        dispatch(changeBudgetInfo({
            currentBudget: 0,
            currentExpenses: 0
        }))
    }
    else{
        dispatch(changeBudgetInfo({
            currentBudget: totalBudget,
            currentExpenses: totalExpense
        }))
    }

    const data = {
        labels: [''],
        datasets: [{
            
            data: [totalExpense, totalRemains],
            backgroundColor: ['blue', '#90bfec7c'],
            borderColor: ['transparent', 'transparent'],
            circumference: 180,
            rotation: 270,
            cutout: '95%',
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }, 
    }

  return (
    <div className="dashboard__top-budget">
        <p className="dashboard__top-budget-title">Бюджет vs Траты</p>
        <p className="dashboard__top-budget-date">C 01 - {currentDay} {nameMonth.get(currentMonth)}</p>

        {filteredTransactions.length > 0? 
            <div className="dashboard__top-budget-chart">
                <Doughnut
                    data={data}
                    options={options}
                />
                <p 
                className="dashboard__top-budget-count"
                >
                    ₽ {totalExpense}
                    <br />
                    <span>из ₽ {totalBudget}</span>
                </p>
            </div>
            :
            <>
                <p className="empty-transactions">
                    Нет данных о расходах за выбранный месяц
                </p>
            </>
        }
        
        
    </div>
  )
}

export default GaugeChart