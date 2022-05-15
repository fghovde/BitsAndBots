import { useRouter } from 'next/router';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Logout = () => {
    const [username, setUsername] = useLocalStorage('username', '');
    const [password, setPassword] = useLocalStorage('password', '');
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedin', '');
    const [items, setItems] = useLocalStorage('cart', []);
    const router = useRouter();

    const signOutUser = () => {
        setItems([]);
        setUsername(null);
        setPassword(null);
        setLoggedIn(false);
        router.push('/');
    }

    return (
        <form onClick={signOutUser}>
            <input type='submit' value='Sign out' className='cursor-pointer'></input>
        </form>
    );
};

export default Logout;