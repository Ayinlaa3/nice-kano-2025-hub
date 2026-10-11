export const CONFERENCE_EMAIL = "conference@nicehq.org";
export const OFFICIAL_CONTACTS = [
  { name: "Engr. Shola Ayanronke Adeleke", role: "Acting ES", phone: "+234 803 443 6630" },
  { name: "Engr. Abdulrazak Owolabi", role: "Conference enquiries", phone: "+234 803 614 3465" },
  { name: "Ahmed Ayinla", role: "Conference enquiries", phone: "+234 818 209 7622" },
] as const;
export const SUPPORT_CONTACTS = [
  { name: "Jumoke", role: "General support", phone: "+234 701 152 5668" },
  { name: "Blessing", role: "Conference materials", phone: "+234 902 429 4897" },
  { name: "Salisu", role: "Students Matter", phone: "+234 816 421 4092" },
  { name: "Mercy", role: "Spouses matter", phone: "+234 901 472 9135" },
  { name: "Omorinsola", role: "Registration", phone: "+234 813 766 7839" },
  { name: "Shade", role: "Programmes", phone: "+234 814 785 0870" },
  { name: "Rokeebat", role: "Lagos City Tour", phone: "+234 906 868 9196" },
  { name: "Oluwatosin", role: "Graduate Career Fair", phone: "+234 906 361 3889" },
] as const;
export function whatsappLink(contact: { name: string; role: string; phone: string }) {
  return `https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${contact.name}, I need help with ${contact.role.toLowerCase()} for the NICE Lagos 2026 Conference, 20–22 October. Please assist me.`)}`;
}