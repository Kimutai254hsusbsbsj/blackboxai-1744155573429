// Configuration
const ETHERSCAN_API_KEY = 'YOUR_API_KEY_HERE';
const WALLETCONNECT_BRIDGE = 'https://bridge.walletconnect.org';
const INFURA_ID = 'YOUR_INFURA_ID';

const config = {
    apiKeys: {
        etherscan: ETHERSCAN_API_KEY,
        infura: INFURA_ID
    },
    walletConnect: {
        bridge: WALLETCONNECT_BRIDGE,
        qrcodeModalOptions: {
            mobileLinks: [
                'metamask',
                'trust',
                'rainbow',
                'argent',
                'imtoken'
            ]
        }
    },
    defaultNetwork: 'mainnet',
    refreshInterval: 30000,
    sessionDuration: 3600 // 1 hour in seconds
};

// You can add more configuration options here as needed
