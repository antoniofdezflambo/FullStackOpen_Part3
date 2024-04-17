const Form = ({name, number, handleSubmit, handleChangeName, handleChangeNumber}) => {
    return(
      <form onSubmit={handleSubmit}>
        <h3>Add new</h3>
        <div>
          name: <input value={name} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={number} onChange={handleChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form