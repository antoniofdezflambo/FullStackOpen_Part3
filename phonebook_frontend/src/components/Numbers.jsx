const Numbers = ({persons, filter, handleClick}) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {persons.filter(
                    person =>
                        person.name.toLowerCase().includes(filter.toLowerCase())).map(
                            filteredPerson =>
                                <div key={filteredPerson.name}>
                                    <li>{filteredPerson.name} {filteredPerson.number}</li>
                                    <button onClick={() => handleClick(filteredPerson.id)}>delete</button>
                                </div>
                        )}
            </ul>
        </>
    )
}

export default Numbers