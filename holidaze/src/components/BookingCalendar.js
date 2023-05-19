import React, {
	useEffect,
	useState,
} from 'react';
import {
	useDispatch,
	useSelector,
} from 'react-redux';
import dayjs from 'dayjs';
import { fetchBookings } from '../store/modules/bookingSlice';

const BookingCalendar = () => {
	const dispatch = useDispatch();
	const bookings = useSelector(
		(state) => state.bookings.bookings
	);
	const [date, setDate] = useState(dayjs());
	const [selectedDate, setSelectedDate] =
		useState(null);

	useEffect(() => {
		dispatch(fetchBookings());
	}, [dispatch]);

	const startDay = date
		.startOf('month')
		.startOf('week');
	const endDay = date
		.endOf('month')
		.endOf('week');
	const days = Array.from(
		{ length: endDay.diff(startDay, 'day') + 1 },
		(_, i) => startDay.add(i, 'day')
	);

	const weeks = Array.from(
		{ length: Math.ceil(days.length / 7) },
		(_, i) => days.slice(i * 7, i * 7 + 7)
	);

	return (
		<div className="flex flex-col items-center justify-center p-10">
			<div className="flex items-center justify-between w-full max-w-2xl p-2">
				<button
					onClick={() =>
						setDate(date.subtract(1, 'month'))
					}
					className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
				>
					Previous
				</button>
				<div className="text-center">
					<span className="text-xl font-bold">
						{date.format('MMMM YYYY')}
					</span>
				</div>
				<button
					onClick={() =>
						setDate(date.add(1, 'month'))
					}
					className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
				>
					Next
				</button>
			</div>

			<div className="border border-gray-300 w-full max-w-2xl">
				{weeks.map((week, i) => (
					<div
						key={i}
						className="grid grid-cols-7 divide-x divide-gray-300"
					>
						{week.map((day, j) => (
							<div
								key={j}
								className={`p-4 border-b last:divide-x-0 ${
									day.isSame(selectedDate, 'day')
										? 'bg-blue-200'
										: 'hover:bg-gray-200'
								} ${
									day.isSame(date, 'month')
										? 'text-black'
										: 'text-gray-500'
								}`}
								onClick={() =>
									setSelectedDate(day)
								}
							>
								{day.format('D')}
							</div>
						))}
					</div>
				))}
			</div>

			{selectedDate && (
				<p className="mt-4">
					Selected date:{' '}
					{selectedDate.format('YYYY-MM-DD')}
				</p>
			)}
		</div>
	);
};

export default BookingCalendar;
