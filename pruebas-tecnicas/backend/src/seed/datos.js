export const productos = [
  {
    orden: 1,
    slug: 'shell-dining-chair',
    designerName: 'Space Copenhagen',
    productName: 'Shell Dining Chair',
    description:
      'A sculptural dining chair moulded from recycled post-consumer plastic and finished with FSC-certified oak legs. Its soft, enveloping shell reflects the calm restraint of Scandinavian design, built to last for generations.',
    imageUrl: '/silla_negra.png',
    link: '#',
  },
  {
    orden: 2,
    slug: 'dunes-table',
    designerName: 'Tom Stepp',
    productName: 'Dunes Anthracite Black',
    description:
      'Inspired by the shifting shapes of coastal dunes, this table is crafted from repurposed industrial waste bound into a durable, stone-like surface. A deep anthracite finish gives it a quiet presence rooted in Nordic simplicity.',
    imageUrl: '/mesa_negra.png',
    link: '#',
  },
  {
    orden: 3,
    slug: 'accent-armchair',
    designerName: 'Mater Studio',
    productName: 'Accent Armchair',
    description:
      'A generous lounge chair framed in solid sustainably sourced wood and upholstered in natural wool. Clean lines and honest materials bring Scandinavian warmth to any space. Every piece is made by hand with respect for people and planet.',
    imageUrl: '/sofa_blanco.png',
    link: '#',
  },
];

export const menu = [
  {
    label: 'Collection',
    slug: 'collection',
    orden: 1,
    tipo: 'principal',
    submenu: [
      { label: 'Furniture', slug: 'furniture', previewImage: '/sofa_blanco.png' },
      { label: 'Lighting', slug: 'lighting', previewImage: '/mesa_negra.png' },
      { label: 'Accessories', slug: 'accessories', previewImage: '/mesa_negra.png' },
    ],
  },
  { label: 'Design', slug: 'design', orden: 2, tipo: 'principal' },
  { label: 'Craftsmanship', slug: 'craftsmanship', orden: 3, tipo: 'principal' },
  { label: 'Ethics', slug: 'ethics', orden: 4, tipo: 'principal' },
  { label: 'About', slug: 'about', orden: 5, tipo: 'secundario' },
  { label: 'Contact', slug: 'contact', orden: 6, tipo: 'secundario' },
  { label: 'Stockists', slug: 'stockists', orden: 7, tipo: 'secundario' },
  { label: 'Journal', slug: 'journal', orden: 8, tipo: 'secundario' },
];
