const getStorage = async (key) => {
  const values = window.localStorage.getItem(key);

  return values ? JSON.parse(values) : undefined;
};

export default getStorage;
