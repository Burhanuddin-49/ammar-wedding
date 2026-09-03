/**
 * Calendar ICS Generator for Ammar & Amatullah Wedding
 */
export function downloadWeddingIcs() {
  const title = "Wedding of Ammar & Amatullah - Khushi Nu Jaman";
  const description =
    "By the grace of Allah Ta'ala and Dua Mubarak of Syedna Aali Qadar Mufaddal Saifuddin (T.U.S.), you are cordially invited to the wedding celebration (Khushi Nu Jaman) of Ammar & Amatullah at Fakhri Hall, Saifee Mohalla, Ratlam.";
  const location = "Fakhri Hall, Saifee Mohalla, Ratlam";

  // Event: 5 Nov 2026, 20:30 (8:30 PM)
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ammar & Amatullah Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:wedding-ammar-amatullah-20261105@ammarwedding.com",
    "SUMMARY:" + title,
    "DESCRIPTION:" + description,
    "LOCATION:" + location,
    "DTSTART:20261105T173000Z",
    "DTEND:20261105T203000Z",
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Wedding of Ammar & Amatullah Tomorrow",
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
