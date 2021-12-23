export const mongoConfig = {
  uri: process.env.MONGODB_URI || '',
};

export const inpeConfig = {
  url: process.env.INPE_URL || '',
  user: process.env.INPE_USER || '',
  pass: process.env.INPE_PASS || '',
};

export const geodecoderConfig = {
  key: process.env.GEODECODER_API_KEY || '',
};

export const mapsConfig = {
  key: process.env.NEXT_PUBLIC_MAPS_KEY || '',
};

export const basicAuth = {
  name: process.env.BASIC_NAME || '',
  pass: process.env.BASIC_PASS || '',
};
