import React, { useState } from 'react';

import { Signer } from '@waves/signer';
import { ProviderKeeper } from '@waves/provider-keeper';

function App() {
  const [userAssets, setUserAssets] = useState<string>('');

  const signer = new Signer({
    NODE_URL: 'https://nodes-testnet.wavesnodes.com'
  });
  const keeper = new ProviderKeeper();
  signer.setProvider(keeper);

  const handleClick = async () => {
    try {
      await signer.login();
      const balance = await signer.getBalance();
      setUserAssets(JSON.stringify(balance));
    } catch (error) {
      console.log('error:', error);
    }
  };


  return (
    <div className="App">
      <button onClick={handleClick}>Connect wallet</button>
      <pre>
        {userAssets}
      </pre>
    </div>
  );
}

export default App;