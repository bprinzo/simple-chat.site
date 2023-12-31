import icon from '../../public/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../styles/header.css';
import '../styles/body.css';



export default function Header ({props}){

    const navegar = useRouter();

    const renderNavLinks = (props:string) => {
        switch (props) {
            case 'Home':
                return (
                    <>
                        <span onClick={() => navegar.push('/')}><strong>Logout</strong></span>
                    </>
                );

            case 'Login':
                return (
                    <>
                        <span onClick={() => navegar.push('/register')}><strong>Register</strong></span>
                    </>
                );

            case 'Register':
                return (
                    <>
                        <span onClick={() => navegar.push('/')}><strong>Login</strong></span>
                    </>
                );

            default:
                break;
        }
    }

    if(props == 'Login' || props == 'Register'){
        return(
            <>
                <div className="Header">
                    <div className='Header-logo'>
                        <Image
                            src={icon}
                            alt="Icone"
                            height={200}
                            width={200}
                            priority />

                        <h1>iChat</h1>
                    </div>
                    <div className='Header-btns'>
                        {renderNavLinks(props)}
                    </div>
                </div>
            </>
        )
    }else{
        return (
        <>
            <div className="Header">
                <a href="/home">
                    <div className='Header-logo'>
                        <Image
                            src={icon}
                            alt="Icone"
                            height={200}
                            width={200}
                            priority />
    
                        <h1>iChat</h1>
                    </div>
                </a>
                <div className='Header-btns'>
                    {renderNavLinks(props)}
                </div>
            </div>
        </>
        )
    }
}