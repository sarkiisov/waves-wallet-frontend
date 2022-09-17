export const getDAppData = async (dAppAddress: string) => {
  const data = await fetch(`https://nodes-testnet.wavesnodes.com/addresses/data/${dAppAddress}`, {
    method: 'GET'
  }).then((response) => response.json());
  return data;
};