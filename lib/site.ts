export const SITE = {
  name: "AGUSTÍN MAYORISTA",
  tagline: "El mayorista que tu negocio necesita",
  whatsapp: "59898538148",
  whatsappDisplay: "+598 098 538 148",
  email: "Agustinmayorista1998@gmail.com",
  instagram: "https://www.instagram.com/agustin_mayorista",
  instagramHandle: "@agustin_mayorista",
  hoursLunVie: "Lunes a Viernes · 9:00 a 18:00",
  hoursSab: "Sábados · 9:00 a 13:00",
  freeShippingFrom: 5000,
};

export const waLink = (message: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;