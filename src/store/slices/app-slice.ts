import { ethers } from "ethers";
import { TOKEN_NAME } from "../../constants";
import { prettyTimeRemaining, setAll, apiGetRequest, BASE_URL } from "../../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { RootState } from "../store";
import { IMetrics } from "../types";

interface ILoadAppDetails {
    networkID: number;
    provider: JsonRpcProvider;
}

export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    //@ts-ignore
    async () => {
        const getProtocolMetrics = await apiGetRequest(`${BASE_URL}/protocols/get_protocol_metrics?token=${TOKEN_NAME}`);
        
        console.log(getProtocolMetrics)

        const metrics: IMetrics = {
            price: getProtocolMetrics.data[0].price_usd,
            treasury: Number(getProtocolMetrics.data[0].treasury_value.toFixed(2)).toLocaleString(),
            totalHolders: Number(getProtocolMetrics.data[0].total_holders).toLocaleString(),
            infinityPool: Number(getProtocolMetrics.data[0].infinity_pool_value.toFixed(2)).toLocaleString(),
            stakedHistorical: getProtocolMetrics.data[0].staked_historical
        }
        return {
            metrics: metrics,
        };
    },
);

const initialState = {
    loading: false,
    metrics: {}
};

export interface IAppSlice {
    loading: boolean;
    metrics: IMetrics;
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
