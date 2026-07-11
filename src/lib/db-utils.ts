export function toLowerKeys(obj: any): any {
  if (Array.isArray(obj)) return obj.map(toLowerKeys);
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k.toLowerCase(), toLowerKeys(v)])
    );
  }
  return obj;
}

const keyMap: Record<string, string> = {
  huggingfacerepo: 'huggingFaceRepo',
  filename: 'fileName',
  filesizegb: 'fileSizeGB',
  minimumram: 'minimumRAM',
  isfeatured: 'isFeatured',
  ispopular: 'isPopular',
  downloadurl: 'downloadURL',
  iconurl: 'iconURL',
  createdat: 'createdAt',
  updatedat: 'updatedAt',
  recommendeddevices: 'recommendedDevices',
  coverimageurl: 'coverImageURL',
  iconname: 'iconName',
  actionurl: 'actionURL',
  imageurl: 'imageURL',
  backgroundcolor: 'backgroundColor',
  textcolor: 'textColor',
  displayorder: 'displayOrder',
  nametr: 'nameTR',
  namede: 'nameDE',
  descriptiontr: 'descriptionTR',
  descriptionde: 'descriptionDE',
  categorytr: 'categoryTR',
  categoryde: 'categoryDE',
  tagstr: 'tagsTR',
  tagsde: 'tagsDE',
  linkedmodelid: 'linkedModelID',
  datelabel: 'dateLabel',
  datelabeltr: 'dateLabelTR',
  datelabelde: 'dateLabelDE',
  titletr: 'titleTR',
  titlede: 'titleDE',
  subtitletr: 'subtitleTR',
  subtitlede: 'subtitleDE',
  bodytr: 'bodyTR',
  bodyde: 'bodyDE',
  summarytr: 'summaryTR',
  summaryde: 'summaryDE',
  tagtr: 'tagTR',
  tagde: 'tagDE'
};

export function toCamelKeys(obj: any): any {
  if (Array.isArray(obj)) return obj.map(toCamelKeys);
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [keyMap[k] || k, toCamelKeys(v)])
    );
  }
  return obj;
}
