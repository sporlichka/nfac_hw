import UserCard from "./components/UserCard"
export default function Props(){
    const users = [
        {id:1, name:'shoc', age:20}, 
        {id:2, name:'dan', age:20}, 
        {id:3, name:'Amina', age:18}];

        return (
            <div>
                <h1>Users:</h1>
                {users.map((user) => (
                    <UserCard key={user.id} name={user.name} age={user.age} />
                ))}
            </div>
        );
}