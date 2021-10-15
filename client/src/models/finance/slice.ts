import { createSlice } from '@reduxjs/toolkit'

// Types
import { PayloadAction } from '@reduxjs/toolkit'
import { ILoadingStatus } from '#interfaces/common'
import { AppThunk } from '#models/store'
import { IFinanceCategory, IFinanceRecord } from '#interfaces/finance'

// Utils
import { Http } from '#utils/Http'

const initialState: CounterState = {
	categories: {
		items: [],
		status: 'idle',
	},
	records: {
		notTrashed: {
			items: [],
			status: 'idle',
		},
		trashed: {
			items: [],
			status: 'idle',
		},
	},
}

const financeSlice = createSlice({
	name: 'finance',
	initialState,
	reducers: {
		setNotTrashedRecords: (state, action: PayloadAction<IFinanceRecord[]>) => {
			state.records.notTrashed = {
				items: action.payload,
				status: 'success',
			}
		},
		setTrashedRecords: (state, action: PayloadAction<IFinanceRecord[]>) => {
			state.records.trashed = {
				items: action.payload,
				status: 'success',
			}
		},
		setCategories: (state, action: PayloadAction<IFinanceCategory[]>) => {
			state.categories = {
				items: action.payload,
				status: 'success',
			}
		},
	},
})

export const { setCategories, setNotTrashedRecords, setTrashedRecords } = financeSlice.actions
export const financeReducer = financeSlice.reducer

// Thunks
export const getCategories = (): AppThunk => async (dispatch, getState) => {
	if (getState().finance.categories.status !== 'idle') return
	const categories = await Http.get({ url: 'api/finance-category' })
	dispatch(setCategories(categories))
}
export const getRecords = (): AppThunk => async (dispatch, getState) => {
	if (getState().finance.records.notTrashed.status === 'idle') {
		const records = await Http.get({ url: 'api/finance-record?isTrashed=false' })
		dispatch(setNotTrashedRecords(records))
	}

	if (getState().finance.records.trashed.status === 'idle') {
		const records = await Http.get({ url: 'api/finance-record?isTrashed=true' })
		dispatch(setTrashedRecords(records))
	}
}

// Types
interface CounterState {
	categories: {
		items: IFinanceCategory[]
		status: ILoadingStatus
	}
	records: {
		notTrashed: {
			items: IFinanceRecord[]
			status: ILoadingStatus
		}
		trashed: {
			items: IFinanceRecord[]
			status: ILoadingStatus
		}
	}
}
