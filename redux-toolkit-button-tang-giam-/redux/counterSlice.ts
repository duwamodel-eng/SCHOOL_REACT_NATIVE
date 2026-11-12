import { createSlice } from '@reduxjs/toolkit';

interface CounterState{
  value: number
}

const initialState: CounterState ={
  value : 0
}

const CounterSlice = createSlice ({
  name: 'counter',
  initialState,
  reducers:{
    inc: (state) =>{
      state.value +=1
    },
    dec: (state) =>{
      if(state.value>0){
        state.value -= 1
      }
      else state.value=0
    },
    reset: (state) =>{
      state.value=0
    },
    incByAmount : (state, action: {payload:number}) =>{
      state.value += state.payload
    }
  }
})

export const {inc, dec, reset, incByAmount} = CounterSlice.actions
export default CounterSlice.reducer 
