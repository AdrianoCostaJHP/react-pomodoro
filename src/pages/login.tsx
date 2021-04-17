import { signIn } from 'next-auth/client';
import styles from '../styles/pages/Login.module.css';
import Head from 'next/head';
import { FaArrowRight, FaGithub } from 'react-icons/fa';


export default function Login() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Login | Pomodore </title>
            </Head>

            <main className={styles.containerMain}>

                <strong>Bem-vindo</strong>
                <div className={styles.Git} >
                    <FaGithub color="#dcdde0" size={29} />
                    <p>Faça login com seu GitHub para começar</p>
                </div>

                <a
                    href={`/api/auth/signin`}
                    onClick={(e) => {
                        e.preventDefault()
                        signIn('', { callbackUrl: 'http://localhost:3000/home' })
                    }}>
                    <p>Fazer login</p>
                    <FaArrowRight color="#FFF" size={24} />
                </a>
            </main>
        </div>
    )
}