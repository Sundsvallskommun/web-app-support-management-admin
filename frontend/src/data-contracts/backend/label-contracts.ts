export interface LabelsApiResponse {
  labelStructure: Label[];
}

export interface Label {
  resourceName: string;
  classification: string;
  displayName?: string;
  id?: string;
  labels?: Label[];
}

export interface LabelSaveRequest {
  labelStructure?: Label[];
}