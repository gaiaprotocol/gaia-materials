import { startServer } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";
import { serveWalletApi } from "https://raw.githubusercontent.com/yjgaia/wallet-login-module/main/deno/wallet.ts";
import { serveContractApi } from "https://raw.githubusercontent.com/yjgaia/contract-event-tracker/main/deno/contract.ts";
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
        "base-sepolia": "0xD3B4b6B07949A807E18d93F33Fe9a9516dADf453",
      },
    },
    {
      MaterialTrade: 15865079,
    },
  ),
);
