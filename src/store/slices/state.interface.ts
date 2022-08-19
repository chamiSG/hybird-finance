import { IAppSlice } from "./app-slice";
import { IInvestmentSlice } from "./investment-slice";

import { IPendingTxn } from "./pending-txns-slice";
import { IAccountSlice } from "./account-slice";
import { MessagesState } from "./messages-slice";

export interface IReduxState {
    app: IAppSlice;
    investment: IInvestmentSlice;
    pendingTransactions: IPendingTxn[];
    account: IAccountSlice;
    messages: MessagesState;
}
