export default function TimeSelection(props) {
  const epochToHour = (epoch, timeZone) => {
    // Show time in selected time zone instead of local time
    const date = new Date(
      new Date(epoch * 1000).toLocaleString("en-US", { timeZone })
    );
    const hour = date.getHours();
    return hour >= 12
      ? hour !== 12
        ? `${hour - 12}pm`
        : "12pm"
      : hour !== 0
      ? `${hour}am`
      : "12am";
  };
  return (
    <nav className="TimeSelection">
      {props.hourly.slice(0, 10).map((hour, i) => (
        <li
          key={i}
          className={props.selectedIndex === i ? "selected" : ""}
          onClick={() => props.setSelectedIndex(i)}
        >
          {epochToHour(hour.dt, props.timeZone)}
        </li>
      ))}
    </nav>
  );
}
