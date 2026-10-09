export const APP_URL = "https://app.gosafespend.com";
export const SITE_URL = "https://gosafespend.com";

export const IOS_APP_ID = "6796527654";
/** App Analytics provider token (App Store Connect > Analytics > Campaigns). Public by design: it appears in every campaign link. */
export const IOS_PROVIDER_TOKEN = "129244800";
export const ANDROID_PACKAGE = "com.safespend.app";

export const IOS_STORE_URL = `https://apps.apple.com/app/id${IOS_APP_ID}`;
export const ANDROID_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

/** Where QR codes and share links point; routes the visitor by device. */
export const DOWNLOAD_URL = `${SITE_URL}/download`;
