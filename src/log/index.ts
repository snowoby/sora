const ErrorHead = [
  "%c error ",
  "background-color:#c00;color:white;border-radius:4px",
];
const WarningHead = [
  "%c warning ",
  "background-color:#FA0;color:white;border-radius:4px",
];

const index = {
  ...console,

  info: (...something: any[]) => {
    console.log("info", ...something);
  },
  error: (...something: any[]) => {
    console.log(...ErrorHead, ...something);
  },
  warning: (...something: any[]) => {
    console.log(...WarningHead, ...something);
  },
};

export default index;
