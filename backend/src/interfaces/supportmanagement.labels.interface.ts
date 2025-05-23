export interface LabelsInterface {
  created: string;
  modified: string;
  labelStructure: LabelInterface[];
}

export interface LabelInterface {
  classification: string;
  displayName?: string;
  name: string;
  labels?: LabelInterface[];
}

export interface LabelSaveRequestInterface {
  labels: LabelInterface[];
}
