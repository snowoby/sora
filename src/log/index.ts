const ErrorHead = [
  "%c error ",
  "background-color:#c00;color:white;border-radius:4px",
];
const WarningHead = [
  "%c warning ",
  "background-color:#FA0;color:white;border-radius:4px",
];
const InfoHead = [
  "%c %ci%cn%cf%co%c ",
  "background-color:#FA0;border-top-left-radius:4px;border-bottom-left-radius:4px",
  "background-color:#1b76c4;color:white",
  "background-color:#c92c2c;color:white",
  "background-color:#5b6dcd;color:white",
  "background-color:#d0f1de;color:black",
  "background-color:#ffd700;border-top-right-radius:4px;border-bottom-right-radius:4px",
];

const index = {
  ...console,

  info: (...something: any[]) => {
    console.log(...InfoHead, ...something);
  },
  error: (...something: any[]) => {
    console.log(...ErrorHead, ...something);
  },
  warning: (...something: any[]) => {
    console.log(...WarningHead, ...something);
  },
};

export default index;
