import { useState } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';


const Ruleta = () => {
    const [bet, setBet] = useState(0);
    const [resultado, setResultado] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [spinning, setSpinning] = useState(false);

    //Configuracion de la animacion: 
    const [rotate, setRotate] = useSpring(() => ({
        transform: 'rotate(0deg)', //Estado inicial de la ruleta
        config: { tension: 170, friction: 26 }
    }));

    //Función para girar la ruleta: 
    const spinRuleta = async () => {
        if (spinning) return; //Esto evita que se gire mientras ya esta girando. 
        setSpinning(true);

        //Ahora limpiamos el mensaje anterior: 
        setMensaje("");

        //Generamos un giro aleatorio entre 0 y 360 grados.
        const randomRotation = Math.floor(Math.random() * 360) + 1800;
        //Este 1800 es para que gire varias veces. 

        setRotate({
            transform: `rotate(${randomRotation}deg)`//Aplicamos la rotacion aleatoria; 
        });

        //Esperamos 3 segundos y obtenemos el resultado de la ruleta. 
        setTimeout(async () => {
            //Llamamos al backend para que me de el numero ganador. 
            try {
                const response = await axios.post("http://localhost:8080/api/spin", { bet });

                //El backend me devuelve un mensaje y el numerito ganador: 
                const outcome = response.data;
                setResultado(outcome.result);
                setMensaje(outcome.message);
                //Guardamos el mensaje si gano o perdio. 
            } catch (error) {
                console.error("Error al girar la ruleta", error);
                setMensaje("Tenemos un error al recibir la respuesta del backend, moriras rata de dos patas");
            }
            setSpinning(false);
        }, 3000) // 3 segunditos que dura la animation. 

    }

    return (
        <div>
            <h1> Casino Online - Ruleta </h1>
            <h2> Juegue con responsabilidad </h2>

            <div>
                <input type="number" value={bet} onChange={(e) => setBet(Number(e.target.value))} placeholder='Ingrese su apuesta' />
                <button onClick={spinRuleta}> Girar la Ruleta</button>
            </div>

            <div>
                <br/><br/><br/>
                <br/><br/><br/>
                {/* Aca colocamos la animacion de la ruleta */}
                <animated.div style={{ ...rotate, display: "inline-block", borderRadius: "50%" }}>
                    <img
                        src="/ruleta.png"
                        alt="Ruleta"
                        style={{ width: "400px", height: "400px" }}
                    />
                </animated.div>
            </div>
            <div>

                {/* Mostramos un mensaje, si el usuario gano o perdio:  */}
                {mensaje && <h2> {mensaje} </h2>}
                {resultado !== null && <h3> El resultado de la ruleta fue: {resultado} </h3>}

            </div>
        </div>
    )
}

export default Ruleta