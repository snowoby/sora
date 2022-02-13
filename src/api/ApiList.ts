const root = "/";

const account = `${root}account/`;
const profile = `${root}profile/`;
const episode = `${root}episode/`;
const series = `${root}series/`;
const file = `${root}file/`;
const site = `${root}site/`;
const singleFile = `${file}single/`;
const largeFile = `${root}large/`;

export default {
  account,
  login: `${account}login`,
  register: `${account}register`,
  refresh: `${account}refresh`,
  self: account,
  profile,
  site,
  episode,
  file,
  singleFile,
  series,
};
