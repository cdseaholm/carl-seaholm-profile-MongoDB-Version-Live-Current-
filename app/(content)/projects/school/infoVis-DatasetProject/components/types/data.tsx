export type Data = {
  quality: number;
  fixedAcidity: number;
  volatileAcidity: number;
  citricAcid: number;
  residualSugar: number;
  chlorides: number;
  freeSulfurDioxide: number;
  totalSulfurDioxide: number;
  density: number;
  pH: number;
  sulphates: number;
  alcohol: number;
};

export type FormattedData = {
  wineRow: number,
  attributes: {
    attribute: string, value: number
  }[]
};
