import { createSlice } from "@reduxjs/toolkit"; 


const todolist=localStorage.getItem('todo')!==null?JSON.parse(localStorage.getItem('todo')):[];
const todoSlice=createSlice({
    name:"Todo",
    initialState:todolist,
    reducers:{
       addTodo:(state,action)=>{
        state.push(action.payload)
        console.log(action)
        localStorage.setItem('todo',JSON.stringify(state))
       },
       deleteTodo:(state,action)=>{
        const {id}=action.payload;
        const tos=state.find(todo=>todo.id===id);
        if(tos){
            localStorage.setItem('todo',JSON.stringify(state.filter(f=>f.id!==id)))
            return state.filter(f=>f.id!==id)
        }
        
       },
       updateTodo:(state,action)=>{
             const {id,title,desc,date,cat}=action.payload;
            const tod=state.find(todo=>todo.id===id);
            console.log("REDUCER PAGE:: ",id)
            if(tod){
                tod.title=title;
                tod.desc=desc;
                tod.date=date;
                tod.cat=cat;
                // console.log(tod.id,tod.title,tod.desc,tod.date,tod.cat)
            }  
            localStorage.setItem('todo',JSON.stringify(state))   
       },
       markedTodo:(state,action)=>{
        // const {id,title,desc,date,cat,marked}=action.payload;

       }
    }
})
export const {addTodo,deleteTodo,updateTodo}=todoSlice.actions;
export default todoSlice.reducer;