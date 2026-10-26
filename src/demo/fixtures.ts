/**
 * Demo-Welt „Trattoria Demo“.
 * Eine konsistente, fiktive Datenbasis für Hero, Timeline, Funktionsseiten
 * und spätere interaktive Demos. Keine echten Mandantendaten.
 */

export const restaurant = {
  name: "Trattoria Demo",
  location: "Standort Mitte",
  initials: "TD",
} as const;

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: "pizza" | "salate" | "getraenke" | "desserts";
};

export const menu: MenuItem[] = [
  {
    id: "margherita",
    name: "Margherita",
    description: "Tomate, Fior di Latte, Basilikum",
    price: 11.5,
    category: "pizza",
  },
  { id: "diavola", name: "Diavola", description: "Tomate, Mozzarella, scharfe Salami", price: 13.5, category: "pizza" },
  { id: "funghi", name: "Funghi", description: "Tomate, Mozzarella, Champignons", price: 12.5, category: "pizza" },
  { id: "capricciosa", name: "Capricciosa", price: 13.5, category: "pizza" },
  { id: "quattro-formaggi", name: "Quattro Formaggi", price: 13.9, category: "pizza" },
  { id: "marinara", name: "Marinara", price: 9.9, category: "pizza" },
  { id: "tonno", name: "Tonno", price: 12.9, category: "pizza" },
  { id: "calzone", name: "Calzone", price: 13.9, category: "pizza" },
  { id: "vegetariana", name: "Vegetariana", price: 12.9, category: "pizza" },
  { id: "burrata", name: "Burrata-Salat", price: 12.9, category: "salate" },
  { id: "limonade", name: "Hauslimonade", price: 4.5, category: "getraenke" },
  { id: "tiramisu", name: "Tiramisu", price: 6.5, category: "desserts" },
];

export type Channel = "Webshop" | "Vor Ort" | "Lieferplattform";

export type BoardOrder = {
  id: string;
  label: string;
  channel: Channel;
  time: string;
  items: string;
  footLeft: string;
  footRight?: string;
  footRightStatus?: "ready" | "away";
  warn?: boolean;
};

export type BoardLane = {
  key: "new" | "cook" | "ready" | "away";
  title: string;
  orders: BoardOrder[];
};

/** Bestellübersicht im Hero: Stand kurz vor 19 Uhr. */
export const board: BoardLane[] = [
  {
    key: "new",
    title: "Neu",
    orders: [
      {
        id: "1042",
        label: "#1042",
        channel: "Webshop",
        time: "gerade eben",
        items: "2× Margherita, Burrata-Salat, Hauslimonade",
        footLeft: "Abholung 19:00",
      },
      {
        id: "3381",
        label: "#3381",
        channel: "Lieferplattform",
        time: "1 Min.",
        items: "Funghi, Tiramisu",
        footLeft: "Lieferung",
        footRight: "19,00 €",
      },
    ],
  },
  {
    key: "cook",
    title: "In Zubereitung",
    orders: [
      {
        id: "t7",
        label: "Tisch 7",
        channel: "Vor Ort",
        time: "06:12",
        items: "Antipasti, Diavola, Lasagne",
        footLeft: "2 Gäste · Lena",
        footRight: "38,90 €",
      },
      {
        id: "1039",
        label: "#1039",
        channel: "Webshop",
        time: "09:40",
        items: "Quattro Formaggi, Insalata mista",
        footLeft: "Abholung 18:50",
        footRight: "22,40 €",
        warn: true,
      },
      {
        id: "t3",
        label: "Tisch 3",
        channel: "Vor Ort",
        time: "12:05",
        items: "4 Gäste · 9 Positionen",
        footLeft: "2. Gang folgt",
        footRight: "96,30 €",
      },
    ],
  },
  {
    key: "ready",
    title: "Bereit",
    orders: [
      {
        id: "1036",
        label: "#1036",
        channel: "Webshop",
        time: "18:44",
        items: "Capricciosa, Hauslimonade",
        footLeft: "Abholung 18:45",
        footRight: "Abholbereit",
        footRightStatus: "ready",
      },
      {
        id: "3377",
        label: "#3377",
        channel: "Lieferplattform",
        time: "18:46",
        items: "2× Diavola",
        footLeft: "Wartet auf Fahrer",
        footRight: "27,00 €",
      },
    ],
  },
  {
    key: "away",
    title: "Unterwegs",
    orders: [
      {
        id: "1031",
        label: "#1031",
        channel: "Webshop",
        time: "18:39",
        items: "Marinara, Tiramisu",
        footLeft: "Jonas · ca. 6 Min.",
        footRight: "Unterwegs",
        footRightStatus: "away",
      },
    ],
  },
];

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: "Service" | "Küche" | "Bar" | "Fahrer";
};

export const team: TeamMember[] = [
  { id: "lena", name: "Lena K.", initials: "LK", role: "Service" },
  { id: "marco", name: "Marco R.", initials: "MR", role: "Küche" },
  { id: "aylin", name: "Aylin S.", initials: "AS", role: "Küche" },
  { id: "tom", name: "Tom B.", initials: "TB", role: "Bar" },
  { id: "jonas", name: "Jonas W.", initials: "JW", role: "Fahrer" },
];

export type ShiftKind = "service" | "kitchen" | "bar" | "driver" | "open";

/** Wochenplan KW 44, Mo 26.10. bis So 01.11. — null = frei. */
export const shiftWeek = {
  label: "KW 44 · 26.10. – 01.11.",
  days: ["Mo 26", "Di 27", "Mi 28", "Do 29", "Fr 30", "Sa 31", "So 01"],
  rows: [
    {
      memberId: "lena",
      kind: "service" as ShiftKind,
      shifts: ["11–17", null, "17–23", "17–23", "17–23", null, "11–17"],
    },
    {
      memberId: "marco",
      kind: "kitchen" as ShiftKind,
      shifts: ["10–16", "10–16", null, "16–23", "16–23", "16–23", null],
    },
    {
      memberId: "aylin",
      kind: "kitchen" as ShiftKind,
      shifts: ["16–23", "16–23", "16–23", null, null, "10–16", "10–16"],
    },
    { memberId: "tom", kind: "bar" as ShiftKind, shifts: [null, "18–24", "18–24", null, "18–24", "18–24", null] },
    { memberId: "jonas", kind: "driver" as ShiftKind, shifts: [null, null, "17–22", "17–22", null, "17–22", "12–18"] },
  ],
  open: [null, null, null, null, { time: "18–22", role: "Fahrer" }, { time: "17–23", role: "Service" }, null] as Array<{
    time: string;
    role: string;
  } | null>,
  plannedHours: 286,
  staffCount: 14,
};

/** Wochenkennzahlen. Summe der Kanäle = Umsatz. */
export const weekStats = {
  revenue: 24130,
  orders: 1284,
  revenueDelta: "+8,4 %",
  ordersDelta: "+5,1 %",
  avgTicketDelta: "+3,1 %",
  webshopShareDelta: "+4 Pkt.",
  channels: [
    { name: "Vor Ort", revenue: 12548 },
    { name: "Webshop", revenue: 7480 },
    { name: "Lieferplattformen", revenue: 4102 },
  ],
  /** Umsatz pro Tag in Tausend Euro, Mo–So. */
  daily: [2.6, 2.9, 3.1, 3.4, 4.6, 4.9, 2.63],
  dailyPrevious: [2.4, 2.7, 2.9, 3.1, 4.2, 4.5, 2.46],
  topItems: [
    { name: "Margherita", count: 412 },
    { name: "Diavola", count: 268 },
    { name: "Burrata-Salat", count: 197 },
    { name: "Tiramisu", count: 184 },
  ],
};
