import { GoogleLogo } from "phosphor-react";

export function Signin(){
    return(
        <>
            <div>
                <h1>SignIn</h1>

                <span>
                Utilizando autenticação social, por exemplo, autenticação com a Google você <br />
                facilita a vida do usuário permitindo utilizar a aplicação sem fazer cadastrado.
                </span>

                <button type="button" className="button">
                <GoogleLogo />
                    SignIn with Google
                </button>
            </div>
        </>
    )
}