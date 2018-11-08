module.exports = {
  // default applies to all environments
  default: {
    // Blockchain node to deploy the contracts
    deployment: {
      development: {
        enabled: true,
        provider: "ipfs",
        host: "ipfs.infura.io",
        port: 80,
        protocol: "https",
        getUrl: "https://ipfs.infura.io/ipfs/"
        ,
      accounts: [{
          // If privateKey is set to `random`, will generate a random account (can be useful for tests)
          privateKey: "0xb8d851486d1c953e31a44374aca11151d49b8bb3",
          balance: "200 ether",
        }, {
          // If privateKey is set to `random`, will generate a random account (can be useful for tests)
          privateKey: "0xf6d5c6d500cac10ee7e6efb5c1b479cfb789950a",
          balance: "200 ether",
        },
        {
          // If privateKey is set to `random`, will generate a random account (can be useful for tests)
          privateKey: "0xf09324e7a1e2821c2f7a4a47675f9cf0b1a5eb7f",
          balance: "200 ether",
        },
        {
          // If privateKey is set to `random`, will generate a random account (can be useful for tests)
          privateKey: "0xfbaf82a227dcebd2f9334496658801f63299ba24",
          balance: "200 ether",
        },
        {
          // If privateKey is set to `random`, will generate a random account (can be useful for tests)
          privateKey: "0x774b5341944deac70199a4750556223cb008949b",
          balance: "200 ether",
        },
        {
          // If privateKey is set to `random`, will generate a random account (can be useful for tests)
          privateKey: "0x4801428dad07e7c2401d033d195116011fc4e400",
          balance: "200 ether",
        },
        {
          "mnemonic": "12 word mnemonic",
          "addressIndex": "0", // Optional. The index to start getting the address
          "numAddresses": "1", // Optional. The number of addresses to get
          "hdpath": "m/44'/60'/0'/0/" // Optional. HD derivation path
        }
      ]
    },
    // order of connections the dapp should connect to
    dappConnection: [
      "$WEB3", // uses pre existing web3 object if available (e.g in Mist)
      "ws://localhost:8556",
      "http://localhost:8545"
    ],
    gas: "auto",
    contracts: {
      XSSToken: {
        args: [
          "0xf6d5c6d500cac10ee7e6efb5c1b479cfb789950a",
          "0xf09324e7a1e2821c2f7a4a47675f9cf0b1a5eb7f",
          "0xfbaf82a227dcebd2f9334496658801f63299ba24",
          "0x774b5341944deac70199a4750556223cb008949b"
        ]
      },
      XEUASToken: {
        args: [

        ]
      },
      SolarSwop: {
        args: [

        ]
      }
    }
  },
  infura: {
    deployment: {
      host: "ropsten.infura.io/v3/1ff323953d2a4cd1ac1cea6ab59a04f5",
      port: false,
      protocol: 'https',
      type: "rpc",
      accounts: [{
        "mnemonic": "card since exhaust scan firm employ bullet blur security extra source slush",
        "numAddresses": "10"
      }]
    },
    gas: "auto",
    contracts: {
      XSSToken: {
        args: [
          "0x67c496Eb6FA7e8dd39aaF3cFe7a6Bc6f766aa04D",
          "0xdbf5Cba04c0f5e8a7818FeEcc9436906cfc9B8E4",
          "0xF826BD5e22Aa20FB6fd3Fb828C4498056CC97116",
          "0xb878DC641C35EbeeeB9289F14D28C12068daD26A"
        ]
      },
      XEUASToken: {
        args: [
     
        ]
      },
      SolarSwop: {
        args: [

        ]
      }
    }
  }
};