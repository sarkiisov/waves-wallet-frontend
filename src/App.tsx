/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

import { TRANSACTION_TYPES, TRANSACTIONS } from '@wavesenterprise/transactions-factory';
import { sdk } from './sdk';

function App() {

  const handleConnect = async () => {
    await window.WEWallet.initialPromise;
    const res = await window.WEWallet.publicState();
    console.log(res);

    const config: any = await sdk.node.config();
    const fee = config.minimumFee[TRANSACTION_TYPES.Transfer];

    const tx = TRANSACTIONS.Transfer.V3({
      tx_type: 4,
      version: 2,
      senderPublicKey: res.account.publicKey,
      recipient: '3NwTYf6PfEx67zjDQNsePmVep4sr6AbNp3j',
      amount: 100000000,
      fee: fee,
      attachment: 'test'
    });

    const signedTx = await window.WEWallet.signTx(tx);

    try {
      const res = await sdk.broadcastRaw(signedTx);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <button onClick={handleConnect}>Connect wallet</button>
    </div>
  );
}

export default App;