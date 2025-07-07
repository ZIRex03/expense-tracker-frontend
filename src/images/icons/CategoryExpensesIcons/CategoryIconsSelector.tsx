import BILLS from './Счета.png'
import FOOD from './Еда.png'
import PERSONAL from './Личное.png'
import HEALTH from './Здоровье.png'
import EDUCATION from './Образование.png'
import TRANSPORT from './Транспорт.png'
import SUBSCRIPTON from './Подписка.png'
import OTHER from './Другое.png'


const CategoryIconsSelector = (value: string) => {

    switch(value){

        case 'Счета':
            return <img src={BILLS} alt={value} />
        case 'Еда':
            return <img src={FOOD} alt={value} />
        case 'Личное':
            return <img src={PERSONAL} alt={value} />
        case 'Здоровье':
            return <img src={HEALTH} alt={value} />
        case 'Образование':
            return <img src={EDUCATION} alt={value} />
        case 'Транспорт':
            return <img src={TRANSPORT} alt={value} />
        case 'Подписка':
            return <img src={SUBSCRIPTON} alt={value} />
        case 'Другое':
            return <img src={OTHER} alt={value} />
                
        default: return null
    }

}

export default CategoryIconsSelector