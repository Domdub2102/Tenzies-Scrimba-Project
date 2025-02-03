export default function Die({value, isHeld, holdDice}) {

    // styles object where we conditionally render green background for held dice
    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }
    return (
        // requires a callback func inside onClick to prevent infinite loop of rerendering
        <button style={styles} className="die" onClick={holdDice}>
            {value}
        </button>
    )
}