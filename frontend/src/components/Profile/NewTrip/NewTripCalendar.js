import { useState } from 'react';
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import { motion } from "framer-motion";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import './NewTripForm.css';

const NewTripCalendar = ({page, setPage, formData, setFormData, x, setX}) => {
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
        setFormData({ ...formData, tripDates: dayzArr})
    }

    return (
        // <motion.div
        // initial={{ x: x }}
        // transition={{ duration: 1 }}
        // animate={{ x: 0 }}
        // className="nt-card"
        // >    
            <div id="calendar-div">
                <button
                    onClick={() => {
                    alert("You've successfully submitted this form");
                    }}>
                    Submit
                </button>
                <br />
                <button
                    onClick={() => {
                    setPage(page - 1);
                    setX(-1000);
                    }}>
                    Previous
                </button>
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
        // </motion.div>
    )
}

export default NewTripCalendar;


// ****
// getDaysArray function sourced from https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates