export const SITE = {
  name: "AGUSTÍN MAYORISTA",
  tagline: "El mayorista que tu negocio necesita",
  whatsapp: "59899111111",
  whatsappDisplay: "+598 99 111 111",
  phone: "2200 1111",
  email: "ventas@agustinmayorista.com.uy",
  address: "Av. 18 de Julio 2345, Montevideo, Uruguay",
  hoursLunVie: "Lunes a Viernes · 9:00 a 18:00",
  hoursSab: "Sábados · 9:00 a 13:00",
  freeShippingFrom: 5000,
};

export const waLink = (message: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;