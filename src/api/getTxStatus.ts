export const getTxStatus = async (txId: string) => {
  const [txStatus] = await fetch('https://nodes-testnet.wavesnodes.com/transactions/status?' + new URLSearchParams({
    id: txId
  }), {
    method: 'GET'
  }).then((response) => response.json());
  return txStatus;
};