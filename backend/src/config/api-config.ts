
//Subscribed APIS as lowercased
export const APIS = [
  {
    name: 'simulatorserver',
    version: '2.0',
  },
    {
    name: 'supportmanagement',
    version: '12.0',
  },
      {
    name: 'activedirectory',
    version: '1.0',
  },
] as const;


export const apiURL = (name: string): string => {
  const api = APIS.find(a => a.name === name);
  return api ? `${api.name}/${api.version}` : name;
};
