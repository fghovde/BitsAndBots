import { useLocalStorage } from '../hooks/useLocalStorage';

const DeleteUser = () => {
    const [name, setName] = useLocalStorage('registerName', '');
    const [username, setUsername] = useLocalStorage('registerUsername', '');
    const [password, setPassword] = useLocalStorage('registerPassword', '');
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedin', '');

    const deleteuser = () => {
        setName('');
        setUsername(null);
        setPassword(null);
        setLoggedIn(false);
        alert('User deleted from Bits&Bots')
    }

    return (
        <form onSubmit={deleteuser} className='forms'>
            <input type='submit' value='Delete user' className='forms__submit forms__submit--discrete'></input>
        </form>
    );
};

export default DeleteUser;