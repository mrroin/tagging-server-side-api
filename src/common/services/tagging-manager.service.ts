import { HttpAdapterService } from "@common/adapters/http.adapter";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TaggingManagerService {
  googleUrl: string;
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
    this._configService = _configService;
    this._httpAdapterService = _httpAdapterService;
  }

  public async sendTagging(
    clientId: string,
    eventName: string,
    eventParams: any,
    utmParams: any
  ) {
    try {
      this.logger.log(this.googleUrl);
      const events = [];
      console.log("sendTagging => utmParams: ", utmParams);
      if (utmParams && utmParams?.source) {
        events.push({
          name: "campaign_details",
          params: {
            ...utmParams,
            engagement_time_msec: this._configService.get("googleEngagementTime"),
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
      this.logger.log("sendTagging => payload: ");
      this.logger.log(payload);
      await this._httpAdapterService.post(this.googleUrl, payload);
      return { success: true, message: "Tagging enviado exitosamente" };
    } catch (error) {
      console.error("Error al enviar el correo: ", error);
      return { success: false, message: "Fallo al enviar el tagging" };
    }
  }
}
