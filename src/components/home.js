import React, { useState } from 'react'
import axios from 'axios'
import Title from '../img/poke.png'
import NotResults from '../img/pikapika.gif'
import './home.css'

const URL = 'https://pokeapi.co/api/v2/pokemon/'

const Home = () => {
    const [inp , setInp] = useState("")
    const [poke , setPoke] = useState("")
    let heightPoke 
    


    function getPoke(){
        
        if(inp === ""){
            alert("Por favor ingrese un nombre o ID")
            setPoke("")
            
        }

        else{
            axios.get(URL + `${inp}`)
            .then(response => setPoke(response.data))
            .catch(error => setPoke("error"))
            
            setInp("")
            
        }

    }

    
    if(poke !== "error" && poke !== undefined && poke !== "") heightPoke = poke.height.toString()
    
    console.log(poke)

    return(
        <div className='contentPoke'>
            <img src={Title} width='300px' height='100px'/>

            <label for="name" className='lblSearch'>Ingrese el nombre o ID del Pokemón</label>

            <div className='contentSearch'>
                <input className='inpName' type='text' placeholder='Escribe el pokemon...' id="name" 
                        value={inp} name="name" onChange={(e) => setInp(e.target.value)}/>
                
                <button className='btnSearch' onClick={() => getPoke()}> Consultar </button>
            </div>

            {
                 poke === "error"  ? 

                 <div className='contentCardError'>
                     <h2 >Búsqueda sin resultados</h2>

                    <img src={NotResults} alt='Sin resultados' className='notResultsImg' />
                </div>
                
                : poke !== "" &&

                    <div className='contentCard'>
                        <div className='flex1'>
                            <h3 className='namePoke'>{poke.name}</h3>

                            <img src={poke.sprites?.other?.dream_world?.front_default} alt={poke.name} className='pokeImg'/>
                        </div>

                        <div className='flex2'>


                            <p className='itemDesc'>Experiencia base : {poke.base_experience}</p>

                            <p className='itemDesc'>Altura : {heightPoke.charAt(1) ? `${heightPoke.charAt(0)},${heightPoke.charAt(1)} m`: `0,${heightPoke.charAt(0)} m`}</p>

                            <p className='itemDesc' >Peso : {`${poke.weight / 10} kg`}</p>


                            <p className='itemDesc' id='tipoRed'>Tipo </p>

                            <div className='contentAbilities'>

                                {
                                    poke.types.map(t => <p className='ability'>{t.type.name}</p>)
                                }

                            </div>

                            <p className='itemDesc'>Habilidades  </p>

                            <div className='contentAbilities'>
                                
                                    {
                                        poke.abilities.map(ab =><p className='ability'>{ab.ability.name}</p> )
                                    }
                                
                            </div>

                        </div>


                 </div>

                 

            }

        </div>
    )
}

export default Home