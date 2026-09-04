/**
 * Calendar ICS Generator for Ammar & Amatullah Wedding
 */
export function downloadWeddingIcs() {
  const title = "Wedding of Ammar & Amatullah - Khushi Nu Jaman";
  const description =
    "By the grace of Allah Ta'ala and Dua Mubarak of Syedna Aali Qadar Mufaddal Saifuddin (T.U.S.), you are cordially invited to the wedding celebration (Khushi Nu Jaman) of Ammar & Amatullah at Fakhri Hall, Saifee Mohalla, Ratlam.";
  const location = "Fakhri Hall, Saifee Mohalla, Ratlam";

  // Event 1: Khushi Nu Jaman (5 Nov 2026, 8:30 PM IST = 15:00 UTC)
  // Event 2: Walima (6 Nov 2026, 1:30 PM IST = 08:00 UTC)
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ammar & Amatullah Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    // Event 1: Khushi Nu Jaman
    "BEGIN:VEVENT",
    "UID:wedding-ammar-amatullah-jaman-20261105@ammarwedding.com",
    "SUMMARY:Wedding of Ammar & Amatullah — Khushi Nu Jaman",
    "DESCRIPTION:" + description,
    "LOCATION:" + location,
    "DTSTART:20261105T150000Z",
    "DTEND:20261105T180000Z",
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Khushi Nu Jaman (Ammar & Amatullah) Tomorrow",
    "END:VALARM",
    "END:VEVENT",
    // Event 2: Walima
    "BEGIN:VEVENT",
    "UID:wedding-ammar-amatullah-walima-20261106@ammarwedding.com",
    "SUMMARY:Wedding of Ammar & Amatullah — Walima",
    "DESCRIPTION:You are cordially invited to the auspicious Walima reception of Ammar & Amatullah at Fakhri Hall, Saifee Mohalla, Ratlam.",
    "LOCATION:" + location,
    "DTSTART:20261106T080000Z",
    "DTEND:20261106T110000Z",
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Walima (Ammar & Amatullah) Tomorrow",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "Ammar_Amatullah_Wedding_Invitation.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
