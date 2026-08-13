export const EnvConfiguration = () => ({
  // -- APLICATION
  port: parseInt(process.env.PORT),
  globalPrefix: process.env.GLOBAL_PREFIX,
  throttleGeneralTtl: parseInt(process.env.THROTTLE_GENERAL_TTL),
  throttleGeneralLimit: parseInt(process.env.THROTTLE_GENERAL_LIMIT),
  throttleLoginTtl: parseInt(process.env.THROTTLE_LOGIN_TTL),
  throttleLoginLimit: parseInt(process.env.THROTTLE_LOGIN_LIMIT),
  throttleSingupTtl: parseInt(process.env.THROTTLE_SINGUP_TTL),
  throttleSingupLimit: parseInt(process.env.THROTTLE_SINGUP_LIMIT),
  throttleFirstDepositTtl: parseInt(process.env.THROTTLE_FIRST_DEPOSIT_TTL),
  throttleFirstDepositLimit: parseInt(process.env.THROTTLE_FIRST_DEPOSIT_LIMIT),
  throttleDepositTtl: parseInt(process.env.THROTTLE_DEPOSIT_TTL),
  throttleDepositLimit: parseInt(process.env.THROTTLE_DEPOSIT_LIMIT),

  // -- GOOGLE TAGGING
  googleUrl: process.env.GOOGLE_URL,
  googleMeasurementId: process.env.GOOGLE_MEASUREMENT_ID,
  googleApiSecret: process.env.GOOGLE_API_SECRET,
  googleDebug: process.env.GOOGLE_DEBUG === "true" ? true : false,
  googleEngagementTime: parseInt(process.env.GOOGLE_ENGAGEMENT_TIME),

  //META TAGGING
  metaUrl: process.env.META_URL,
  metaPixelId: process.env.META_PIXEL_ID,
  metaPixelAccesToken: process.env.META_PIXEL_ACCESS_TOKEN,
  metaPixelDebug: process.env.META_PIXEL_DEBUG === "true" ? true : false,
  metaPixelTestEvent: process.env.META_PIXEL_TEST_EVENT,
});
