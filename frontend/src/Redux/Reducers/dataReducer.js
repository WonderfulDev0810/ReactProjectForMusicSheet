import { LOADING_COMPOSERS, LOADING_DATA, SET_SHEETS, SET_COMPOSERS, RESET_DATA, SET_PAGE_SHEETS } from '../types'

const initialState = {
    sheets: [],
    sheetPages: {},
    composers: [],
    page: 1,
    loading: false
}

export default function(state = initialState, action){
    let index
    switch(action.type){
        case LOADING_DATA: 
            return {
                ...state,
                loading: true
            }
        
        case SET_PAGE_SHEETS: 
            return {
                ...state,
                sheetPages: {...state.sheetPages, [action.page]: action.payload},
                loading: false
            }

        case SET_SHEETS:
            return {
                ...state,
                sheets: action.payload,
                loading: false
            }

        case LOADING_COMPOSERS:
            return {
                ...state,
                loading: true
            }   
            
        case SET_COMPOSERS:
            return {
                ...state,
                composers: action.payload,
                loading: false
            }
        
        case RESET_DATA: 
            return {
                ...state,
                composers: [],
                sheets: []
            }
            

        default:
            return state   
    }
}