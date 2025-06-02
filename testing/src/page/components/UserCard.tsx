

export default function UserCard (props) {
    return (
        <div style = {{border: '1px solid', padding: '10px', marginBottom: '10px'}}>
            <h2>{props.name}</h2>
            <p> Age {props.age} </p>
        </div>
    )
}