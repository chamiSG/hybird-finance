import { ethers } from "ethers";
import { TOKEN_NAME } from "../../constants";
import { prettyTimeRemaining, setAll, apiGetRequest, BASE_URL } from "../../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { RootState } from "../store";
import { IMetrics } from "../types";

export const loadInvestmentDetails = createAsyncThunk(
    "app/loadInvestmentDetails",
    //@ts-ignore
    async () => {
        const investment = await apiGetRequest(`${BASE_URL}/get_investment_balance?token=${TOKEN_NAME}`);
        
        console.log(investment)

        // const metrics: IMetrics = {
        //     price: getProtocolMetrics.data[0].price_usd,
        //     treasury: Number(getProtocolMetrics.data[0].treasury_value.toFixed(2)).toLocaleString(),
        //     totalHolders: Number(getProtocolMetrics.data[0].total_holders).toLocaleString(),
        //     infinityPool: Number(getProtocolMetrics.data[0].infinity_pool_value.toFixed(2)).toLocaleString(),
        //     stakedHistorical: getProtocolMetrics.data[0].staked_historical
        // }
        return {
            metrics: {},
        };
    },
);

const initialState = {
    loading: false,
    metrics: {}
};

export interface IInvestmentSlice {
    loading: boolean;
    metrics: IMetrics;
}

const investmentSlice = createSlice({
    name: "investment",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadInvestmentDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadInvestmentDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadInvestmentDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default investmentSlice.reducer;

export const { fetchAppSuccess } = investmentSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
