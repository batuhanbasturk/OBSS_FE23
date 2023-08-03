const formatDateAndTime = (dateString) => {
  const date = new Date(dateString);
  const optionsDate = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", optionsDate).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat("en-US", optionsTime).format(
    date
  );
  return `${formattedDate}\n${formattedTime}`;
};

export { formatDateAndTime };
