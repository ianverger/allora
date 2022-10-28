import { useState } from 'react';
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import './NewTripCalendar.css';

const NewTripCalendar = ({setDates, setShowModal}) => {
    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
    ]);

    const getDaysArray = function(start, end) {
        for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        return arr;
    };

    const handleSubmit = e => {
        e.preventDefault();
        const startDate = dateRange[0].startDate;
        const endDate = dateRange[0].endDate;
        // console.log(startDate, "start");
        // console.log(endDate, "end");
        const dayzArr = getDaysArray(startDate, endDate);
        setDates(dayzArr);
        setShowModal(false);
    }

    return (
        <div id="calendar-div">
            <form onSubmit={handleSubmit} id="calendar-form">
                {<DateRange
                onChange={item => setDateRange([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={dateRange}
                rangeColors={["#F3CFC6"]}
                direction="horizontal"
                />}
                <input type="submit" value="submit" id="submit-cal-button" />
            </form>
        </div>
    )
}

export default NewTripCalendar;


// ****
// getDaysArray function sourced from https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates