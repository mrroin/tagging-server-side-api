import { HttpAdapterService } from "@common/adapters/http.adapter";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";

@Injectable()
export class TaggingManagerService {
  googleUrl: string;
  metaUrl: string;
  private readonly logger = new Logger(
    `management-api ${TaggingManagerService.name}`
  );
  constructor(
    private readonly _configService: ConfigService,
    private readonly _httpAdapterService: HttpAdapterService
  ) {
    this.googleUrl = `${this._configService.get(
      "googleUrl"
    )}?measurement_id=${this._configService.get(
      "googleMeasurementId"
    )}&api_secret=${this._configService.get("googleApiSecret")}`;
    this.metaUrl = `${this._configService.get(
      "metaUrl"
    )}/${this._configService.get(
      "metaPixelId"
    )}/events?access_token=${this._configService.get("metaPixelAccesToken")}`;
    this._configService = _configService;
    this._httpAdapterService = _httpAdapterService;
  }

  // Hashear con SHA-256 (normalizar en minúsculas y sin espacios)
  hashSha256 = (value: string) => {
    return crypto
      .createHash("sha256")
      .update(value?.toLowerCase().trim())
      .digest("hex");
  };

  public async sendTaggingGoogle(
    clientId: string,
    eventName: string,
    eventParams: any,
    utmParams: any
  ) {
    try {
      this.logger.log("googleUrl");
      this.logger.log(this.googleUrl);
      const events = [];
      if (utmParams && utmParams?.source) {
        events.push({
          name: "campaign_details",
          params: {
            ...utmParams,
            engagement_time_msec: this._configService.get(
              "googleEngagementTime"
            ),
            debug_mode: this._configService.get("googleDebug"),
          },
        });
      }
      events.push({
        name: eventName,
        params: {
          ...eventParams,
          engagement_time_msec: this._configService.get("googleEngagementTime"),
          debug_mode: this._configService.get("googleDebug"),
        },
      });
      const payload = {
        client_id: clientId,
        events: events,
      };
      this.logger.log("sendTagging google => payload: ");
      this.logger.log(payload);
      await this._httpAdapterService.post(this.googleUrl, payload);
      return { success: true, message: "Tagging google enviado exitosamente" };
    } catch (error) {
      this.logger.error("Error al enviar tagging google: ", error);
      return { success: false, message: "Fallo al enviar el tagging google" };
    }
  }

  public async sendTaggingMeta(
    clientId: string,
    eventName: string,
    eventParams: any,
    utmParams: any
  ) {
    try {
      this.logger.log("metaUrl");
      this.logger.log(this.metaUrl);
      const action_source = eventParams?.actionSource;
      delete eventParams?.actionSource;
      const event_source_url = eventParams?.eventSourceUrl;
      delete eventParams?.eventSourceUrl;
      const event_name = eventParams?.eventName;
      delete eventParams?.eventName;
      const client_ip_address = eventParams?.clientIpAddress;
      delete eventParams?.clientIpAddress;
      const client_user_agent = eventParams?.clientUserAgent;
      delete eventParams?.clientUserAgentN;
      const event_id = eventParams?.eventId;
      delete eventParams?.eventId;
      const fbp = eventParams?.fbp;
      delete eventParams?.fbp;
      const em = [];
      const ph = [];
      if (eventParams?.email) {
        em.push(this.hashSha256(eventParams?.email));
        delete eventParams?.email;
      }
      if (eventParams?.phone) {
        ph.push(this.hashSha256(eventParams?.phone));
        delete eventParams?.phone;
      }
      const event = {
        event_time: new Date().getTime(),
        event_id,
        event_name,
        event_source_url,
        action_source,
        fbp,
        user_data: {
          em: em,
          ph: ph,
          external_id: clientId,
          client_ip_address,
          client_user_agent,
        },
        custom_data: {
          ...eventParams,
          ...utmParams,
          event_name: eventName,
        },
      };
      let debugData = {};
      if (this._configService.get("metaPixelDebug")) {
        debugData = {
          test_event_code: this._configService.get("metaPixelTestEvent"),
        };
      }
      const payload = {
        data: [event],
        ...debugData,
      };
      this.logger.log("sendTagging meta => payload: ");
      this.logger.log(payload);
      const data = await this._httpAdapterService.post(this.metaUrl, payload);
      return {
        success: true,
        message: "Tagging meta enviado exitosamente",
        data,
      };
    } catch (error) {
      this.logger.error("Error al enviar tagging meta: ", error);
      return { success: false, message: "Fallo al enviar el tagging meta" };
    }
  }
}
