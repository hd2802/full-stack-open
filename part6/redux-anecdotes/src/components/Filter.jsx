import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    const search = (event) => {
        // simpler function works here for some reason
        dispatch(filterChange(event.target.value))
    }

    return (
        <div>
            filter <input name="filter" onChange={search}/>
        </div>
    )
}

export default Filter;