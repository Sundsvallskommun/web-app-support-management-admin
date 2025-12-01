export interface LabelsInterface {
  labelStructure: LabelInterface[];
}

export interface LabelInterface {
  // NOTE: Name will be removed in sm12 and only use resourceName
  name: string;
  resourceName: string;
  classification: string;
  displayName?: string;
  resourcePath?: string;
  id?: string;
  labels?: LabelInterface[];
}

export interface LabelSaveRequestInterface {
  labels: LabelInterface[];
}
