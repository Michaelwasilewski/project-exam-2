import React, {
	useState,
	useEffect,
} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ bookings, formik }) => {
	const [localStartDate, setLocalStartDate] =
		useState(new Date());
	const [localEndDate, setLocalEndDate] =
		useState(null);
	const [excludedDates, setExcludedDates] =
		useState([]);

	useEffect(() => {
		const excludedDatesArray = [];
		bookings.forEach((booking) => {
			const start = new Date(booking.dateFrom);
			const end = new Date(booking.dateTo);
			end.setDate(end.getDate() + 1);
			for (
				let day = new Date(start.getTime());
				day < end;
				day.setDate(day.getDate() + 1)
			) {
				excludedDatesArray.push(new Date(day));
			}
		});
		setExcludedDates(excludedDatesArray);
	}, [bookings]);

	const isDateExcluded = (date) => {
		return excludedDates.some(
			(excludedDate) =>
				excludedDate.getDate() ===
					date.getDate() &&
				excludedDate.getMonth() ===
					date.getMonth() &&
				excludedDate.getFullYear() ===
					date.getFullYear()
		);
	};

	const getDayClassName = (date) => {
		return isDateExcluded(date) ? 'excluded' : '';
	};

	const onChange = (dates) => {
		const [start, end] = dates;
		const hasConflict = bookings.some(
			(booking) => {
				const bookingStart = new Date(
					booking.dateFrom
				);
				const bookingEnd = new Date(
					booking.dateTo
				);
				bookingEnd.setDate(
					bookingEnd.getDate() + 1
				);
				return (
					(start <= bookingStart &&
						bookingStart < end) ||
					(start < bookingEnd &&
						bookingEnd <= end)
				);
			}
		);
		if (hasConflict) {
			setLocalStartDate(null);
			setLocalEndDate(null);
			formik.setFieldValue('dateFrom', null);
			formik.setFieldValue('dateTo', null);
		} else {
			setLocalStartDate(start);
			setLocalEndDate(end);
			formik.setFieldValue('dateFrom', start);
			formik.setFieldValue('dateTo', end);
		}
	};

	return (
		<DatePicker
			selected={localStartDate}
			onChange={onChange}
			startDate={localStartDate}
			endDate={localEndDate}
			selectsRange
			minDate={new Date()}
			inline
			excludeDates={excludedDates}
			dayClassName={getDayClassName}
		/>
	);
};

export default Calendar;
