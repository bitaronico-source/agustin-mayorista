export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  badge?: "NUEVO" | "OFERTA" | "ÚLTIMAS UNIDADES";
  featured?: boolean;
  description: string;
};

export type Category = {
  name: string;
  image: string;
  blurb: string;
};

const size = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?q=75&w=${w}&auto=format&fit=crop`;

export const HERO_IMG = size("1553413077-190dd305871c", 1920);
export const ABOUT_IMG = size("1586528116311-ad8dd3c8310d", 1400);
export const CTA_IMG = size("1534438327276-14e5300c3a48", 1920);

export const CATEGORIES: Category[] = [
  {
    name: "ROPA",
    blurb: "Textiles y moda al por mayor",
    image: size("1441986300917-64674bd600d8", 700),
  },
  {
    name: "BAZAR",
    blurb: "Cocina y artículos del hogar",
    image: size("1585515320310-259814833e62", 700),
  },
  {
    name: "VELAS",
    blurb: "Aromáticas y veladores",
    image: size("1602874801007-bd458bb1b8b6", 700),
  },
  {
    name: "COTILLÓN",
    blurb: "Fiestas y eventos",
    image: size("1514525253161-7a46d19cd819", 700),
  },
  {
    name: "HOGAR",
    blurb: "Blanco y decoración",
    image: size("1555041469-a586c61ea9bc", 700),
  },
  {
    name: "JARDINERÍA",
    blurb: "Plantas y accesorios",
    image: size("1416879595882-3373a0480b5b", 700),
  },
  {
    name: "HERRAMIENTAS",
    blurb: "Bazar técnico y ferretería",
    image: size("1504148455328-c376907d081c", 700),
  },
];

export const FILTER_CATEGORIES = [
  "ROPA",
  "BAZAR",
  "VELAS",
  "COTILLÓN",
  "HOGAR",
  "JARDINERÍA",
  "HERRAMIENTAS",
  "ELECTRÓNICA",
  "ALIMENTOS",
  "ACCESORIOS",
];

export const PRODUCTS: Product[] = [
  /* ROPA */
  {
    id: "pack-6-remeras-basicas",
    name: "Pack 6 Remeras Básicas Algodón",
    category: "ROPA",
    price: 1890,
    stock: 45,
    badge: "OFERTA",
    featured: true,
    image: size("1523381210434-271e8be1f52b"),
    description:
      "Pack 6 unidades de remeras básicas en algodón peinado, disponibles en talles S a XXL. Ideal para stock permanente en tu local.",
  },
  {
    id: "gorras-deportivas-unisex",
    name: "Gorras Deportivas Unisex x12",
    category: "ROPA",
    price: 990,
    stock: 60,
    badge: "NUEVO",
    featured: true,
    image: size("1521369909029-2afed882baee"),
    description:
      "Doce gorras deportivas unisex con cierre ajustable y buena ventilación. Colores surtidos por techo de 12 unidades.",
  },
  {
    id: "pack-medias-deportivas",
    name: "Pack 10 Pares Medias Deportivas",
    category: "ROPA",
    price: 890,
    stock: 80,
    image: size("1576871337622-98d48d1cf531"),
    description:
      "Diez pares de medias tobillera en algodón con elastano. Surtido en rayas y colores. Rotación asegurada.",
  },
  {
    id: "remeras-estampadas",
    name: "Remeras Estampadas x3",
    category: "ROPA",
    price: 1450,
    stock: 30,
    badge: "ÚLTIMAS UNIDADES",
    image: size("1441986300917-64674bd600d8"),
    description:
      "Pack de 3 remeras con estampado premium de alta duración. Modelos exclusivos con acceso limitado a stock.",
  },
  {
    id: "remeras-premium-pack",
    name: "Pack 4 Remeras Premium Manga Larga",
    category: "ROPA",
    price: 1790,
    stock: 38,
    image: size("1618354691373-d851c5c3a990"),
    description:
      "Cuatro remeras de manga larga en algodón premium, corte moderno y amplia rotación en invierno.",
  },

  /* BAZAR */
  {
    id: "olla-acero-24cm",
    name: "Olla de Acero Inoxidable 24cm",
    category: "BAZAR",
    price: 1290,
    stock: 25,
    image: size("1585515320310-259814833e62"),
    description:
      "Olla de acero inoxidable 18/10 con tapa de vidrio y apta para todo tipo de cocinas. Peso completo y terminación brillante.",
  },
  {
    id: "juego-cuchillos-6p",
    name: "Juego de Cuchillos 6 Piezas",
    category: "BAZAR",
    price: 1650,
    stock: 40,
    badge: "OFERTA",
    featured: true,
    image: size("1593618998160-e34014e67546"),
    description:
      "Set de 6 cuchillos de acero inoxidable con mango ergonómico y bloque de madera. Presentación premium para regalar o revender.",
  },
  {
    id: "sarten-antiadherente-28",
    name: "Sartén Antiadherente 28cm",
    category: "BAZAR",
    price: 890,
    stock: 55,
    badge: "NUEVO",
    featured: true,
    image: size("1556909114-f6e7ad7d3136"),
    description:
      "Sartén con doble capa antiadherente reforzada, mango aislante y base de difusión rápida. 3 colores disponibles.",
  },
  {
    id: "juego-vajilla-16",
    name: "Juego de Vajilla 16 Piezas",
    category: "BAZAR",
    price: 2740,
    stock: 20,
    image: size("1603199506016-b9a594b593c0"),
    description:
      "Vajilla completa para 4 comensales: platos, bowls y tasas en porcelana blanca. Caja regalo lista para exhibir.",
  },
  {
    id: "juego-ollas-5p",
    name: "Juego de Ollas 5 Piezas",
    category: "BAZAR",
    price: 2390,
    stock: 18,
    badge: "ÚLTIMAS UNIDADES",
    image: size("1556909211-36987daf7b4d"),
    description:
      "Juego de 5 ollas en acero con tapa, desde 16 hasta 26 cm. Anidadles y fáciles de almacenar.",
  },

  /* VELAS */
  {
    id: "pack-12-velas-aromaticas",
    name: "Pack 12 Velas Aromáticas",
    category: "VELAS",
    price: 1350,
    stock: 70,
    badge: "OFERTA",
    featured: true,
    image: size("1602874801007-bd458bb1b8b6"),
    description:
      "Doce velas aromáticas de soja en frascos de vidrio con tapa. Aromas: vainilla, lavanda, coco y canela.",
  },
  {
    id: "velas-cilindricas-x24",
    name: "Velas Cilíndricas Premium x24",
    category: "VELAS",
    price: 980,
    stock: 90,
    badge: "NUEVO",
    image: size("1603006905003-be475563bc59"),
    description:
      "Cilíndricas de parafina blanca premium, 7x7 cm, con gran duración. Pack de 24 unidades para evento o cadena.",
  },
  {
    id: "set-veladores",
    name: "Set Veladores Estilo Vintage",
    category: "VELAS",
    price: 760,
    stock: 120,
    image: size("1587829741301-dc798b83add3"),
    description:
      "Veladores de vidrio con salvagotas estilo vintage. Surtido de larga vida útil y mucho margen.",
  },

  /* COTILLÓN */
  {
    id: "globos-x100",
    name: "Globos x100 Colores Variados",
    category: "COTILLÓN",
    price: 640,
    stock: 150,
    image: size("1514525253161-7a46d19cd819"),
    description:
      "Cien globos latex 9” en colores surtidos. Producto de máxima rotación en cotillón y decoración de eventos.",
  },
  {
    id: "pack-cotillon-festejo",
    name: "Pack Cotillón Festejo Completo",
    category: "COTILLÓN",
    price: 1150,
    stock: 65,
    badge: "NUEVO",
    featured: true,
    image: size("1530103862676-de8c9debad1d"),
    description:
      "Kit completo para fiestas: gorros, collares, matracas, serpentinas y brillantina. Presentado para regalo.",
  },
  {
    id: "descartables-fiesta",
    name: "Descartables y Manteles Fiesta",
    category: "COTILLÓN",
    price: 720,
    stock: 95,
    image: size("1593810450967-f9c42742e326"),
    description:
      "Set de vasos, platos, servilletas y mantel para 50 personas. Ideal para catering y eventos.",
  },

  /* HOGAR */
  {
    id: "juego-sabanas-queen",
    name: "Juego de Sábanas Queen",
    category: "HOGAR",
    price: 2190,
    stock: 50,
    image: size("1584100936595-c0654b55a2e2"),
    description:
      "Juego de sábanas de microfibra 1500 hilos, talle Queen. Incluye sábana de abajo, de arriba y dos fundas.",
  },
  {
    id: "pack-toallones",
    name: "Pack 12 Toallones Acolchados",
    category: "HOGAR",
    price: 2790,
    stock: 40,
    badge: "OFERTA",
    image: size("1586023492125-27b2c045efd7"),
    description:
      "Doce toallones acolchados 70x140 de algodón 100%. Colores surtidos. Clásico de la cadena blanca.",
  },
  {
    id: "set-almohadones",
    name: "Set 4 Almohadones Decorativos",
    category: "HOGAR",
    price: 1350,
    stock: 25,
    badge: "NUEVO",
    image: size("1616486338812-3dadae4b4ace"),
    description:
      "Cuatro almohadones 45x45 con funda lavable y relleno de fibra. Texturas mix: cordón, lino y terciopelo.",
  },
  {
    id: "organizador-6-cajones",
    name: "Organizador de Ropa 6 Cajones",
    category: "HOGAR",
    price: 2200,
    stock: 15,
    badge: "ÚLTIMAS UNIDADES",
    image: size("1526170375885-4d8ecf77b99f"),
    description:
      "Organizador textil de 6 cajones con estructura metálica plegable. Tendencia en orden del hogar.",
  },

  /* JARDINERÍA */
  {
    id: "kit-macetas-sustrato",
    name: "Kit Macetas + Sustrato",
    category: "JARDINERÍA",
    price: 890,
    stock: 60,
    image: size("1416879595882-3373a0480b5b"),
    description:
      "Kit de 5 macetas con plato y bolsa de sustrato preparado. Fácil de exhibir y excelente margen.",
  },
  {
    id: "regaderas-5l",
    name: "Regaderas 5L",
    category: "JARDINERÍA",
    price: 690,
    stock: 75,
    badge: "NUEVO",
    image: size("1585320806297-9794b3e4eeae"),
    description:
      "Regadera de 5 litros en PVC resistente con rociador removible. Colores: verde, negro y terracota.",
  },
  {
    id: "macetas-decorativas-x6",
    name: "Macetas Decorativas x6",
    category: "JARDINERÍA",
    price: 1150,
    stock: 45,
    image: size("1466692476868-aef1dfb1e735"),
    description:
      "Seis macetas de cerámica con plato en diseño contemporáneo. Venta atada a decoración y plantas.",
  },

  /* HERRAMIENTAS */
  {
    id: "caja-herramientas-41",
    name: "Caja de Herramientas 41 Piezas",
    category: "HERRAMIENTAS",
    price: 2650,
    stock: 30,
    badge: "OFERTA",
    featured: true,
    image: size("1504148455328-c376907d081c"),
    description:
      "Caja troquelada con 41 piezas: dados, llaves, destornilladores y alicates en acero al cromo vanadio.",
  },
  {
    id: "juego-llaves-combinadas",
    name: "Juego Llaves Combinadas",
    category: "HERRAMIENTAS",
    price: 990,
    stock: 50,
    image: size("1530124566582-a618bc2615dc"),
    description:
      "Set de 12 llaves combinadas de cromado satinado de 8 a 19 mm. Presentación en bolsa de agenda.",
  },
  {
    id: "atornillador-inalambrico",
    name: "Atornillador Inalámbrico 12V",
    category: "HERRAMIENTAS",
    price: 1450,
    stock: 25,
    badge: "NUEVO",
    image: size("1519389950473-47ba0277781c"),
    description:
      "Atornillador recargable 12V con 24 bits y luz LED. Batería de litio con carga por USB.",
  },

  /* ELECTRÓNICA */
  {
    id: "auriculares-bt-pro",
    name: "Auriculares Bluetooth Pro",
    category: "ELECTRÓNICA",
    price: 1190,
    stock: 55,
    badge: "OFERTA",
    image: size("1505740420928-5e560c06d30e"),
    description:
      "Auriculares over-ear bluetooth 5.3 con cancelación pasiva, micrófono y 30 hs de batería.",
  },
  {
    id: "parlante-portatil-20w",
    name: "Parlante Portátil 20W",
    category: "ELECTRÓNICA",
    price: 2350,
    stock: 40,
    badge: "NUEVO",
    featured: true,
    image: size("1608043152269-423dbba4e7e1"),
    description:
      "Parlante bluetooth 20W con graves profundos, resistencia al agua IPX6 y entrada USB y SD.",
  },
  {
    id: "linterna-led-recargable",
    name: "Linterna LED Recargable",
    category: "ELECTRÓNICA",
    price: 480,
    stock: 130,
    image: size("1542838132-92c53300491e"),
    description:
      "Linterna LED 300 lúmenes con batería recargable USB. Zoom y 5 modos de luz. Muy alta rotación.",
  },

  /* ALIMENTOS */
  {
    id: "arroz-blanco-10",
    name: "Arroz Blanco 10 Kg",
    category: "ALIMENTOS",
    price: 830,
    stock: 500,
    image: size("1586201375761-83865001e31c"),
    description:
      "Arroz blanco tipo largo fino, selección premium. Bolsa de 10 kg con cierre ziploc.",
  },
  {
    id: "aceite-girasol-x6",
    name: "Aceite de Girasol x6 900ml",
    category: "ALIMENTOS",
    price: 1560,
    stock: 220,
    badge: "OFERTA",
    image: size("1474979266404-7eaacbcd87c5"),
    description:
      "Pack de 6 botellas de aceite de girasol 100% 900 ml. Producto base de toda despensa.",
  },
  {
    id: "gaseosa-cola-x12",
    name: "Gaseosa Cola x12 Latas 354ml",
    category: "ALIMENTOS",
    price: 1210,
    stock: 150,
    badge: "NUEVO",
    image: size("1581636625402-29b2a704ef13"),
    description:
      "Doce latas 354 ml de gaseosa cola. Ideal para kioscos, almacenes y eventos.",
  },

  /* ACCESORIOS */
  {
    id: "billeteras-cuero-x6",
    name: "Billeteras de Cuero x6",
    category: "ACCESORIOS",
    price: 1890,
    stock: 40,
    badge: "NUEVO",
    image: size("1627123424574-724758594e93"),
    description:
      "Seis billeteras de cuero con 8 tarjeteros, sector para billetes y monedas. Cajas individuales.",
  },
  {
    id: "mochilas-urbanas",
    name: "Mochilas Urbanas Impermeables",
    category: "ACCESORIOS",
    price: 2150,
    stock: 30,
    badge: "ÚLTIMAS UNIDADES",
    image: size("1553062407-98eeb64c6a62"),
    description:
      "Mochilas impermeables con compartimento para notebook 15”, puerto USB y correa acolchonada.",
  },
  {
    id: "cables-usb-c-x10",
    name: "Cables USB-C Tipo C x10",
    category: "ACCESORIOS",
    price: 590,
    stock: 300,
    image: size("1618410320928-25228d811631"),
    description:
      "Diez cables USB-C trenzados de 1 metro con carga rápida 60W. Accesorio con rotación permanente.",
  },
];

export const featuredProducts = PRODUCTS.filter((p) => p.featured);
export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getCategory = (name: string) =>
  FILTER_CATEGORIES.find((c) => c === name);