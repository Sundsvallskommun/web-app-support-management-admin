export interface LabelInterface {
  resourceName: string;
  classification: string;
  displayName?: string;
  resourcePath?: string;
  id?: string;
  isNew: boolean;
  isLeaf: boolean;
  labels?: LabelInterface[];
}

export interface LabelSaveRequestInterface {
  labels?: LabelInterface[];
}
