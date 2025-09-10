import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    
    const search = (event) => {
        dispatch(setFilter(event.target.value))
    }

    return (
        <div>
            filter <input onChange={search}/>
        </div>
    )
}

export default Filter