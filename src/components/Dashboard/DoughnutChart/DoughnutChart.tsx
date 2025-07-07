
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins, Plugin } from 'chart.js'
import './DoughnutChart.scss'
import { Doughnut } from 'react-chartjs-2'
import { nameMonth } from 'utils/constants'
import { Transactions } from '@pages/Dashboard/DashboardTypes'

type Props = {
    currentDay: number,
    currentMonth: number,
    receivedDate: Date,
    filteredTransactions: Transactions[]
}

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
)

const DoughnutChart = ({currentDay, currentMonth, filteredTransactions, receivedDate}: Props) => {

    var billsCount = 0;
    var foodsCount = 0;
    var personalCount = 0;
    var healthCount = 0;
    var educationCount = 0;
    var transportCount = 0;
    var subscriptionCount = 0;
    var otherCount = 0;

    const currentDate = new Date();

    if(currentDate.getMonth() !== receivedDate.getMonth()){
        currentDay = new Date(receivedDate.getFullYear(), receivedDate.getMonth() + 1,0).getDate()
    }

    filteredTransactions.map(item => {

        switch(item.category){
            case 'Счета':
                billsCount += item.price
                break;
            case 'Еда':
                foodsCount += item.price
                break
            case 'Личное':
                personalCount += item.price
                break
            case 'Здоровье':
                healthCount += item.price
                break
            case 'Образование':
                educationCount += item.price
                break
            case 'Транспорт':
                transportCount += item.price
                break
            case 'Подписка':
                subscriptionCount += item.price
                break
            case 'Другое':
                otherCount += item.price
                break

        }
    })

    const data = {
        labels: [
            'Счета',
            'Еда',
            'Личное',
            'Здоровье',
            'Образование',
            'Транспорт',
            'Подписки',
            'Другое',
        ],
        datasets: [{
            data: [
                billsCount,
                foodsCount,
                personalCount,
                healthCount,
                educationCount,
                transportCount,
                subscriptionCount,
                otherCount
            ],
            backgroundColor: [
                '#008EE4',
                '#D5EDFF',
                '#FEE274',
                '#F0B035',
                '#0CBF71',
                '#75E8C5',
                '#FFBFCA',
                '#F73649'
            ],
            spacing: 8,
            hoverOffset: 5
        }]
    }

  return (
    <div className='dashboard__top-doughnut'>
        <p className="dashboard__top-doughnut-title">Распределение расходов</p>
        <p className="dashboard__top-doughnut-date">C 01 - {currentDay} {nameMonth.get(currentMonth)}</p>

        {filteredTransactions.length > 0?
            <div className="chart">

                <div className="chart__legend">
                    {data.labels.map((label, index) => (
                        <div className='legend-item'>
                            <p
                                className='item-circle'
                                style={{backgroundColor: data.datasets[0].backgroundColor[index]}}>
                            </p>
                            <p className='legend-label'>{label}</p>
                        </div>
                    ))}
                </div>
                
                <div className="chart__doug">
                    <Doughnut
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }
                        }
                    />
                </div>

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

export default DoughnutChart