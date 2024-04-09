export const i18n = {
    defaultLanguage: 'en',
    locales: ["fr", "en"]
} as const;

export type Locale = typeof i18n.locales[number];
