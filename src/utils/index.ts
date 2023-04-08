export const deepClone = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj));
};
