export default function formatDateTime(dateString: string) {
  const date = dateString.split("T");

  let [year, month, day] = date[0].split("-");
  month = getMonthString(month);

  let [hour, minute] = date[1].split(":");

  return `${day} ${month} ${year}, ${hour}:${minute}`;
}

function getMonthString(month: string) {
  switch (month) {
    case "01":
      return "Januari";
    case "02":
      return "Februari";
    case "03":
      return "Maret";
    case "04":
      return "April";
    case "05":
      return "Mei";
    case "06":
      return "Juni";
    case "07":
      return "Juli";
    case "08":
      return "Agustus";
    case "09":
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
