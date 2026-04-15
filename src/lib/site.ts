/** AxisX Bakery — shared business details (sample address — replace with your real location when ready) */
const ADDRESS_FOR_MAPS =
  "No. 12, Kaduwela Road, Malabe, Colombo, Sri Lanka";

/** Map center (Malabe area — adjust when you pin the exact shop in Google Maps) */
const MAP_LAT = 6.9269;
const MAP_LNG = 79.9489;

export const bakeryLocation = {
  name: "AxisX Bakery",
  venue: "AxisX Studio",
  city: "Malabe",
  district: "Colombo",
  country: "Sri Lanka",
  /** Full address for display (multi-line friendly) */
  lines: [
    "AxisX Bakery · AxisX Studio",
    "No. 12, Kaduwela Road",
    "Malabe, Colombo, Sri Lanka",
  ] as const,
  /** Open in Google Maps (app / browser) */
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_FOR_MAPS)}`,
  /**
   * Embedded Google Map — uses `maps.google.com` + coordinates so the iframe loads reliably.
   * For a pin on your exact storefront: Google Maps → your place → Share → Embed a map → paste the `src` here.
   */
  mapsEmbedUrl: `https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=16&output=embed&hl=en&ie=UTF8`,
} as const;

/** Clickable contact channels (shared across Contact + Footer) */
export const contactChannels = {
  phoneDisplay: "+94 77 135 4761",
  phoneHref: "tel:+94771354761",
  email: "info@axisxstudio.com",
  emailHref: "mailto:info@axisxstudio.com",
  webDisplay: "axisxstudio.com",
  webHref: "https://axisxstudio.com",
  /** Opening hours (use `whitespace-pre-line` where line breaks are shown) */
  hoursDisplay: "Mon–Sat: 7AM–9PM\nSun: 8AM–6PM",
  /** Ask about hours via email */
  hoursHref:
    "mailto:info@axisxstudio.com?subject=Opening%20hours&body=Hi%2C%20I%20would%20like%20to%20confirm%20your%20opening%20hours.",
} as const;
