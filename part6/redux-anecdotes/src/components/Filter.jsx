import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    
    const search = (event) => {
        dispatch(filterChange(event.target.value))
    }

    return (
        <div>
            filter <input onChange={search}/>
        </div>
    )
}

export default Filter