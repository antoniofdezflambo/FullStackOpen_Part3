const ErrorNotification = ({ errorMessage }) => {
    if (errorMessage !== '')
        return (
            <div className="error">
                <p>{errorMessage}</p>
            </div>
        )
}

export default ErrorNotification