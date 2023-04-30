import { GoogleLogo } from "phosphor-react";
import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { auth } from '../../services/firebase';
import { useState } from "react";
import { useRouter } from 'next/router';

export function Signin(){
    const [user, setUser] = useState<User>({} as User);
    const router = useRouter();

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
    
        signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result.user);
          setUser(result.user);
          router.push('/Dashboard'); // redireciona para a rota '/outra-pagina'
        }).catch((error) => {
          console.log(error);
        });
      }
    return(
        <>
            <div>
                <div>
                    {user.photoURL && <img src={user.photoURL} alt="Foto do usuário" />}

                    <strong>{user.displayName}</strong>
                    <small>{user.email}</small>
                </div>
                <h1>SignIn</h1>

                <span>
                Utilizando autenticação social, por exemplo, autenticação com a Google você <br />
                facilita a vida do usuário permitindo utilizar a aplicação sem fazer cadastrado.
                </span>

                <button type="button" onClick={signInWithGoogle}  className="button">
                <GoogleLogo />
                    SignIn with Google
                </button>
            </div>
        </>
    )
}