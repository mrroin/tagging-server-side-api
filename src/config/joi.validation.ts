import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
  // -- APLICATION
  port: Joi.number().default(3000),
  globalPrefix: Joi.string().default("api"),
  throttleGeneralTtl: Joi.number().default(60000),
  throttleGeneralLimit: Joi.number().default(1000),
  throttleLoginTtl: Joi.number().default(60000),
  throttleLoginLimit: Joi.number().default(1000),
  throttleSingupTtl: Joi.number().default(60000),
  throttleSingupLimit: Joi.number().default(1000),
  throttleFirstDepositTtl: Joi.number().default(60000),
  throttleFirstDepositLimit: Joi.number().default(1000),
  throttleDepositTtl: Joi.number().default(60000),
  throttleDepositLimit: Joi.number().default(1000),

  // -- GOOGLE TAGGING
  googleUrl: Joi.string().default(
    "https://www.google-analytics.com/mp/collect"
  ),
  googleMeasurementId: Joi.string(),
  googleApiSecret: Joi.string(),
  googleDebug: Joi.boolean().default(false),
  googleEngagementTime: Joi.number().default(1000),

  //META TAGGING
  metaUrl: Joi.string(),
  metaPixelId: Joi.string(),
  metaPixelAccesToken: Joi.string(),
  metaPixelDebug: Joi.boolean().default(false),
  metaPixelTestEvent: Joi.string().default(""),
});
