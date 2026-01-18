// Social Media
export type SocialMediaType = "DISCORD_INVITE_URL" | "WHATSAPP_CHAT_URL"

// Support
export type SupportType = "EMAIL_ADDRESS" | "SITE_SUPPORT_URL" | "CUSTOMER_AREA_URL" | "HELP_CENTER_URL" | "NETWORK_STATUS_URL"

// Communication
export type CommunicationType = "POPUP_TITLE" | "POPUP_CONTENT" | "POPUP_COPYABLE_TEXT" | "POPUP_BUTTON_TEXT" | "POPUP_BUTTON_URL"

// All types combined (for backward compatibility)
export type DynamicContentType = SocialMediaType | SupportType | CommunicationType