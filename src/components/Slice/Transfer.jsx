import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    data:[],
    showData:[],
  value: 0
}

export const counterSlice = createSlice({
  name: 'nameTrans',
  initialState,
  reducers: {
    squadData: (state,action) => {
      state.data=action.payload
    },
    sentPlayer: (state,action) => {
    state.showData=action.payload
    },
    playerUpdate: (state, action) => {
     let updatedArray =state.data.map((upd)=>action.payload.id==upd.id ? {...upd,...action.payload}:upd)
    state.data=updatedArray;
    },
    delPlayer:(state,action)=>{
      const deleteId=action.payload
      state.data=state.data.filter((other)=>deleteId != other.id)
    }
  },
})

export const { squadData, sentPlayer, playerUpdate, delPlayer} = counterSlice.actions

export default counterSlice.reducer