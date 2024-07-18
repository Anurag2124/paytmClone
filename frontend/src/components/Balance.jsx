export const Balance = ({value}) => {

  const parsedValue = parseFloat(value)
  const formattedValue = !isNaN(parsedValue) ? parsedValue.toFixed(2) : '...'

  return <div className="flex">
    <div className="font-semibold text-lg">
      Your balance
    </div>

    <div className="font-semibold ml-2.5 text-lg">
      Rs {formattedValue}
    </div>
  </div>
}