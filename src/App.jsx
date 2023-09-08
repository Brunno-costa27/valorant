import styles from './App.module.css'
import { Header } from './components/Header'
import { Main } from './components/Main'
import './global.css'
import axios from 'axios'
import { useEffect, useState } from 'react'


export function App() {

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Faça uma solicitação GET para obter informações sobre os agentes
    axios
      .get('https://valorant-api.com/v1/agents')
      .then((response) => {
         // Filtrar os dados relevantes dos agentes
         const filteredAgents = response.data.data.filter((agent) => {
          // Aqui, você pode aplicar qualquer lógica de filtro desejada
          // Por exemplo, filtrar apenas agentes que estão ativos
          console.log(agent.fullPortrait);
          return agent.fullPortrait !== null;
        });

         // Definir o estado com os agentes filtrados
         setAgents(filteredAgents);
      })
      .catch((error) => {
        console.error('Erro ao obter informações dos agentes', error);
      });
  }, []);

  return (
   <div>

    <Header/>

    <Main/>

    <section className={styles.section}>
        <div className={styles.contentSection}>
          <h2>SEUS AGENTES</h2>
          <div className={styles.descriptionSection}>
              <span>A CRIATIVIDADE É SUA MELHOR ARMA.</span>
              <p>
                Mais do que armas e munição, VALORANT inclui agentes com habilidades adaptativas, rápidas e letais, que criam oportunidades para você exibir sua mecânica de tiro. Cada Agente é único, assim como os momentos de destaque de cada partida!
              </p>
          </div>
        </div>

        <div className={styles.grid}>
            {agents.map((agent) => (
            <>
              <a href={agent.uuid}>
                <div className={styles.cards}>
                    <img src={agent.fullPortrait} alt={agent.displayName} />
                    <h1>{agent.displayName}</h1>
                </div>
              </a>
            </>
            ))}
            
        </div>
    </section>
   </div>

  )
}
