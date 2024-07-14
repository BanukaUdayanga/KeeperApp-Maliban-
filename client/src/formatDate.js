// Format Date Function
const formatDate = (date) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDayName = dayNames[date.getDay()];
  const currentMonthName = monthNames[date.getMonth()];
  const currentDateNumber = date.getDate();
  const currentYear = date.getFullYear();
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes().toString().padStart(2, "0");
  const currentSeconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = currentHours >= 12 ? "PM" : "AM";
  const formattedHours = (currentHours % 12 || 12).toString().padStart(2, "0");

  return `${currentDayName}, ${currentMonthName} ${currentDateNumber}, ${currentYear} ${formattedHours}:${currentMinutes}:${currentSeconds} ${ampm}`;
};

export default formatDate;
