import { startServer } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";
import { serveWalletApi } from "https://raw.githubusercontent.com/yjgaia/wallet-login-module/main/deno/wallet.ts";
import { serveContractApi } from "https://raw.githubusercontent.com/yjgaia/contract-module/main/deno/contract.ts";
import MaterialTradeContract from "https://raw.githubusercontent.com/gaiaprotocol/gaiaprotocol-module/main/deno/contracts/MaterialTradeContract.ts";

startServer(
  serveWalletApi,
  serveContractApi(
    {
      "base-sepolia": "https://sepolia.base.org",
    },
    {
      MaterialTrade: MaterialTradeContract,
    },
    {
      MaterialTrade: {
        "base-sepolia": "0x3Fcea379bCc53Df5062Bc9428FEFb5c495bE75be",
      },
    },
    {
      MaterialTrade: 15865079,
    },
  ),
);
