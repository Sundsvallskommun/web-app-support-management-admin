export interface LabelInterface {
  name: string;
  resourceName: string;
  classification: string;
  displayName?: string;
  resourcePath?: string;
  prefix?: string;
  id?: string;
  isNew: boolean;
  isLeaf: boolean;
  labels?: LabelInterface[];
}

export interface LabelSaveRequestInterface {
  labels?: LabelInterface[];
}
