export const getTxInfo = async (txId: string) => {
  const [tx] = await fetch('https://nodes-testnet.wavesnodes.com/transactions/info?' + new URLSearchParams({
    id: txId
  }), {
    method: 'GET'
  }).then((response) => response.json());
  return tx;
};