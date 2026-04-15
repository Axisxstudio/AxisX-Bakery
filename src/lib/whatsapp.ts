export const WHATSAPP_NUMBER = "94771354761";

type WhatsAppIntent = "order" | "inquiry";

type WhatsAppMessageParams = {
  intent: WhatsAppIntent;
  item?: string;
  section?: string;
  reference?: string;
  notes?: string;
};

export const buildWhatsAppMessage = ({
  intent,
  item,
  section,
  reference,
  notes,
}: WhatsAppMessageParams): string => {
  const lines = [
    "Hello AxisX Bakery team,",
    intent === "order" ? "I would like to place an order." : "I would like to make an inquiry.",
  ];

  if (item) lines.push(`Item/Service: ${item}`);
  if (section) lines.push(`Section: ${section}`);
  if (reference) lines.push(`Reference: ${reference}`);
  if (notes) lines.push(`Notes: ${notes}`);

  lines.push("Please share availability, price, and next steps.");
  return lines.join("\n");
};

export const createWhatsAppLink = (params: WhatsAppMessageParams): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(params))}`;
