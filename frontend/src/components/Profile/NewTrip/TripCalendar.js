import { useState } from 'react';
import { addDays } from 'date-fns';
// import Calendar from 'react-calendar';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
// import './TripCalendar.css';

const TripCalendar = () => {
    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
    ]);

console.log(dateRange[0].endDate);
    return (
        <div id="calendar-div">
     
            {<DateRangePicker
            onChange={item => setDateRange([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={dateRange}
            color="blue"
            // rangeColors="pink"
            direction="horizontal"
            />}

        </div>
    )
}

export default TripCalendar;