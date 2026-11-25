// Single source of truth for contact details. Change the number here only.
export const PHONE_E164 = "27745561634";
export const PHONE_DISPLAY = "074 556 1634";
export const PHONE_DISPLAY_INTL = "+27 74 556 1634";
export const PHONE_TEL_HREF = `tel:+${PHONE_E164}`;

export function whatsappUrl(text?: string): string {
    const base = `https://wa.me/${PHONE_E164}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
