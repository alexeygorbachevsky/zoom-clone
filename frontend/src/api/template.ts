const sleep = (time = 1000) => new Promise(res => setTimeout(res, time));

export const getInfo = async () => {
  await sleep();

  return { count: 3 };
};
