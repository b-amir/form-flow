const defaultShadows = [
  'none', // 0
  '0px 1px 0px 0px rgba(0, 0, 0, 0.02), 2px 3px 3px 0px rgba(0, 0, 0, 0.06)', // 1
  '0px 0px 1px 0px rgba(0, 0, 0, 0.03),0px 3px 5px 0px rgba(0, 0, 0, 0.05)', // 2
  '4px 4px 18px -2px rgba(231, 228, 232, 0.8)', // 3
  'inset 0px -4px 2px 0px #f2f2f270', // 4
  '0px 0.5px 0px 0px rgba(21, 21, 20, 0.10) inset', //5
  '0px -2px 6px 0px rgba(0, 0, 0, 0.03), 1px 10px 10px 0px rgba(0, 0, 0, 0.01), 0px 20px 17.48px 0px rgba(0, 0, 0, 0.03), 4px 38px 47px 0px rgba(0, 0, 0, 0.07)',
  '0px -2px 6px 0px rgba(0, 0, 0, 0.03), 2px 10px 10px 0px rgba(0, 0, 0, 0.01), 1px 20px 19px 0px rgba(0, 0, 0, 0.03), 6px 33px 46px 0px rgba(0, 0, 0, 0.07)',
  '0px -2px 6px 0px rgba(0, 0, 0, 0.03), 2px 10px 10px 0px rgba(0, 0, 0, 0.01), 1px 20px 65px 0px rgba(0, 0, 0, 0.02), 16px 39px 67px 0px rgba(0, 0, 0, 0.11)',
];

type MuiShadowsType = ['none', ...string[]] & { length: 25 };

const fillShadows = (
  shadows: string[],
  totalShadows: number
): MuiShadowsType => {
  const filledShadows = [...shadows];
  const defaultShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0.0)';

  while (filledShadows.length < totalShadows) {
    filledShadows.push(defaultShadow);
  }

  return filledShadows.slice(0, totalShadows) as MuiShadowsType;
};

const shadows = fillShadows(defaultShadows, 25);

export default shadows;
