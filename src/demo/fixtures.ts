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

/* ------------------------------------------------------------------
   Analytics: drei Zeiträume mit in sich stimmigen Werten.
------------------------------------------------------------------- */
export type AnalyticsRange = "heute" | "woche" | "monat";

export type AnalyticsData = {
  label: string;
  compareLabel: string;
  revenue: number;
  orders: number;
  deltas: { revenue: string; orders: string; avgTicket: string; webshopShare: string };
  channels: { name: string; revenue: number }[];
  /** Umsatz je Punkt in Tausend Euro. */
  series: number[];
  seriesPrevious: number[];
  xLabels: string[];
  topItems: { name: string; count: number }[];
};

export const analytics: Record<AnalyticsRange, AnalyticsData> = {
  heute: {
    label: "Heute",
    compareLabel: "Vorwoche, gleicher Tag",
    revenue: 2418,
    orders: 126,
    deltas: { revenue: "+6,2 %", orders: "+4,1 %", avgTicket: "+2,0 %", webshopShare: "+3 Pkt." },
    channels: [
      { name: "Vor Ort", revenue: 1235 },
      { name: "Webshop", revenue: 798 },
      { name: "Lieferplattformen", revenue: 385 },
    ],
    series: [0.08, 0.21, 0.19, 0.09, 0.05, 0.07, 0.16, 0.33, 0.42, 0.39, 0.27, 0.158],
    seriesPrevious: [0.07, 0.19, 0.18, 0.08, 0.05, 0.06, 0.14, 0.3, 0.4, 0.36, 0.25, 0.2],
    xLabels: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"],
    topItems: [
      { name: "Margherita", count: 41 },
      { name: "Diavola", count: 27 },
      { name: "Burrata-Salat", count: 19 },
      { name: "Tiramisu", count: 18 },
    ],
  },
  woche: {
    label: "Woche",
    compareLabel: "Vorwoche",
    revenue: weekStats.revenue,
    orders: weekStats.orders,
    deltas: {
      revenue: weekStats.revenueDelta,
      orders: weekStats.ordersDelta,
      avgTicket: weekStats.avgTicketDelta,
      webshopShare: weekStats.webshopShareDelta,
    },
    channels: weekStats.channels,
    series: weekStats.daily,
    seriesPrevious: weekStats.dailyPrevious,
    xLabels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    topItems: weekStats.topItems,
  },
  monat: {
    label: "Monat",
    compareLabel: "Vormonat",
    revenue: 90290,
    orders: 4862,
    deltas: { revenue: "+5,7 %", orders: "+3,9 %", avgTicket: "+1,7 %", webshopShare: "+2 Pkt." },
    channels: [
      { name: "Vor Ort", revenue: 47410 },
      { name: "Webshop", revenue: 27080 },
      { name: "Lieferplattformen", revenue: 15800 },
    ],
    series: [21.6, 22.3, 22.26, 24.13],
    seriesPrevious: [20.8, 21.1, 21.0, 22.5],
    xLabels: ["KW 41", "KW 42", "KW 43", "KW 44"],
    topItems: [
      { name: "Margherita", count: 1650 },
      { name: "Diavola", count: 1071 },
      { name: "Burrata-Salat", count: 790 },
      { name: "Tiramisu", count: 735 },
    ],
  },
};

/* ------------------------------------------------------------------
   Connect: Kanäle und Nachrichten.
------------------------------------------------------------------- */
export type ChatMessage = { id: string; author: string; initials: string; role: string; time: string; text: string };

export const channels: { id: string; name: string; members: number; messages: ChatMessage[] }[] = [
  {
    id: "kueche",
    name: "Küche",
    members: 8,
    messages: [
      {
        id: "k1",
        author: "Marco R.",
        initials: "MR",
        role: "Küche",
        time: "18:41",
        text: "Burrata ist für heute aus. Kann jemand den Salat im Shop pausieren?",
      },
      {
        id: "k2",
        author: "Lena K.",
        initials: "LK",
        role: "Service",
        time: "18:42",
        text: "Erledigt. Der Service weiß Bescheid.",
      },
    ],
  },
  {
    id: "service",
    name: "Service",
    members: 6,
    messages: [
      {
        id: "s1",
        author: "Lena K.",
        initials: "LK",
        role: "Service",
        time: "17:55",
        text: "Tisch 3 hat für 19:30 auf sechs Personen erweitert.",
      },
      {
        id: "s2",
        author: "Tom B.",
        initials: "TB",
        role: "Bar",
        time: "17:58",
        text: "Danke, ich stelle zwei Gläser mehr bereit.",
      },
    ],
  },
  {
    id: "lieferung",
    name: "Lieferung",
    members: 4,
    messages: [
      {
        id: "l1",
        author: "Jonas W.",
        initials: "JW",
        role: "Fahrer",
        time: "18:49",
        text: "#1040 abgeholt, bin in ca. 10 Minuten am Markt.",
      },
    ],
  },
];

/* ------------------------------------------------------------------
   Delivery: aktive Lieferungen und Fahrer.
------------------------------------------------------------------- */
export type DeliveryStatus = "cooking" | "ready" | "onroute" | "delivered";

export type Delivery = {
  id: string;
  label: string;
  source: Channel;
  address: string;
  items: string;
  status: DeliveryStatus;
  driverId?: string;
  eta?: string;
};

export const drivers = [
  { id: "jonas", name: "Jonas W.", initials: "JW" },
  { id: "sara", name: "Sara K.", initials: "SK" },
  { id: "emre", name: "Emre T.", initials: "ET" },
];

export const deliveries: Delivery[] = [
  {
    id: "3381",
    label: "#3381",
    source: "Lieferplattform",
    address: "Gartenstraße 18",
    items: "Funghi, Tiramisu",
    status: "cooking",
  },
  {
    id: "1044",
    label: "#1044",
    source: "Webshop",
    address: "Lindenallee 7",
    items: "2× Diavola, Hauslimonade",
    status: "ready",
  },
  {
    id: "1040",
    label: "#1040",
    source: "Webshop",
    address: "Am Markt 12",
    items: "Capricciosa, Burrata-Salat",
    status: "onroute",
    driverId: "jonas",
    eta: "ca. 6 Min.",
  },
  {
    id: "1037",
    label: "#1037",
    source: "Webshop",
    address: "Musterweg 4",
    items: "Marinara",
    status: "delivered",
    driverId: "sara",
  },
];
