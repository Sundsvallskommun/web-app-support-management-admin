export interface LabelsApiResponse {
  labelStructure: Label[];
}

export interface Label {
  // NOTE: Name will be removed in sm12 and only use resourceName
  name: string;
  resourceName: string;
  classification: string;
  displayName?: string;
  resourcePath?: string;
  id?: string;
  labels?: Label[];
}

export interface LabelSaveRequest {
  labelStructure?: Label[];
}