import React, { useState } from 'react';

import { Signer } from '@waves/signer';
import { ProviderKeeper } from '@waves/provider-keeper';
import { getTxInfo, getTxStatus } from './api';
import { getDAppData } from './api/getDAppData';

function App() {
  const [userAssets, setUserAssets] = useState<string>('');

  const signer = new Signer({
    NODE_URL: 'https://nodes-testnet.wavesnodes.com'
  });
  const keeper = new ProviderKeeper();
  signer.setProvider(keeper);

  const handleConnect = async () => {
    try {
      await signer.login();
      const balance = await signer.getBalance();
      setUserAssets(JSON.stringify(balance));
    } catch (error) {
      console.log('error:', error);
    }
  };

  const getConfirmedTransaction = async (txId: string) => {
    try {
      await new Promise<void>((resolve) => {
        const apiCallsInterval = setInterval(async () => {
          const txStatus = await getTxStatus(txId);
          if (txStatus.status === 'confirmed') {
            resolve();
            clearInterval(apiCallsInterval);
          }
        }, 1000);
      });
      const transaction = await getTxInfo(txId);
      return transaction;
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvoke = async () => {
    try {
      const [tx] = await signer.invoke({
        dApp: '3N4boZRUJ2LxY5jLyp6hmxGktqnawQidu6H',
        payment: [
          {
            assetId: 'WAVES',
            amount: 10000000
          }
        ],
        call: {
          function: 'startGame',
          args: []
        }
      }).broadcast();
      const transaction = await getConfirmedTransaction(tx.id);
      console.log('success', transaction);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleData = async () => {
    const dAppAddress = '3N4boZRUJ2LxY5jLyp6hmxGktqnawQidu6H';
    try {
      const data = await getDAppData(dAppAddress);
      console.log(data);
    } catch (error) {
      console.log('error', error);
    }
  };


  return (
    <div className="App">
      <button onClick={handleConnect}>Connect wallet</button>
      <button onClick={handleInvoke}>Invoke contract</button>
      <button onClick={handleData}>Data from contract</button>
      <pre>
        {userAssets}
      </pre>
    </div>
  );
}

export default App;