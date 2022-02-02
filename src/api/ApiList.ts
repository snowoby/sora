const root = "/";

const account = `${root}account/`;
const profile = `${root}profile/`;
const episode = `${root}episode/`;
const file = `${root}file/`;
const singleFile = `${file}single/`;
const largeFile = `${root}large/`;

export default {
  account,
  login: `${account}login`,
  register: `${account}register`,
  refresh: `${account}refresh`,
  self: account,
  profile,
  episode,
  file,
  singleFile,
};
