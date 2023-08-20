export function formatDatetime(datetime: string) {
  datetime = new Date(new Date(datetime).toISOString()).toLocaleString("id-ID");
  const fdatetime = datetime.split(",");
  const [day, month, year] = fdatetime[0].trim().split("/");
  const [hour, minute, second] = fdatetime[1].trim().split(".");

  return `${day} ${getMonthName(month)} ${year}, ${hour}:${minute}`;
}

export function formatDate(date: string) {
  date = new Date(new Date(date).toISOString()).toLocaleString("id-ID");
  const fdatetime = date.split(",");
  const [day, month, year] = fdatetime[0].split("/");

  return `${day} ${getMonthName(month)} ${year}`;
}

function getMonthName(month: string) {
  switch (month) {
    case "1":
      return "Januari";
    case "2":
      return "Februari";
    case "3":
      return "Maret";
    case "4":
      return "April";
    case "5":
      return "Mei";
    case "6":
      return "Juni";
    case "7":
      return "Juli";
    case "8":
      return "Agustus";
    case "9":
      return "September";
    case "10":
      return "Oktober";
    case "11":
      return "November";
    case "12":
      return "Desember";
    default:
      return "";
  }
}
