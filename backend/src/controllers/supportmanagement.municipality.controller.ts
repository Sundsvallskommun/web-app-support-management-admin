import { municipalities } from '@/utils/municipalityUtil';
import { MunicipalitiesResponse } from '@/responses/supportmanagement.namespace.response';
import { Controller, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class SupportmanagementMunicipalityController {
                   
  @Get('/supportmanagement/municipality')
  @OpenAPI({ summary: 'Returns a list of available municipalities' })
  async getMunicipalities(
  ): Promise<MunicipalitiesResponse> {

    return { 
      data: municipalities
        .filter(m => m.municipalityId.startsWith("22"))
        .sort((a, b) => a.name.localeCompare(b.name)),
      message: 'SUCCESS'
    };
  }
}
