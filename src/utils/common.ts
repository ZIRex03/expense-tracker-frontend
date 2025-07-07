
export const setUserGreeting = (currentDate:Date) => {

    switch(true){

        case(currentDate.getHours() >= 6 && currentDate.getHours() < 12):
          return 'Доброе утро';
    
        case(currentDate.getHours() >= 12 && currentDate.getHours() < 18):
          return 'Добрый день';
    
        case(currentDate.getHours() >= 18):
          return 'Добрый вечер';
    
        case(currentDate.getHours() >= 0 && currentDate.getHours() < 6):
          return 'Доброй ночи';
    }
}