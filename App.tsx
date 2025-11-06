import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { GameStatus, Role, TeamState, PlayerProfile, GameAction } from './types';
import { PELAAJIEN_ROOLIT, GAME_CONFIG, TIIMIEN_NIMET, RANKING_CONFIG, RAKENNUKSET } from './constants';
import { BeakerIcon, CpuChipIcon, UsersIcon } from './components/Icons';
import GameUI from './components/GameUI';
import PostGameScreen from './components/PostGameScreen';

const PreGameLobby: React.FC<{ onGameStart: (playerProfile: PlayerProfile, playerRole: Role) => void }> = ({ onGameStart }) => {
  const [playerName, setPlayerName] = useState('');
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null);
  
  useEffect(() => {
    const storedProfile = localStorage.getItem('rannikot_player_profile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setPlayerProfile(profile);
      setPlayerName(profile.name);
    }
  }, []);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      const profile = { name: playerName.trim(), rank: playerProfile?.rank || RANKING_CONFIG.defaultRank };
      localStorage.setItem('rannikot_player_profile', JSON.stringify(profile));
      setPlayerProfile(profile);
    }
  };

  const roles = PELAAJIEN_ROOLIT.content as Role[];
  const icons: { [key: string]: React.ReactNode } = {
    "Tutkija": <BeakerIcon className="w-10 h-10 mb-2 text-sand"/>,
    "Insinööri": <CpuChipIcon className="w-10 h-10 mb-2 text-sand"/>,
    "Yhteisökoordinaattori": <UsersIcon className="w-10 h-10 mb-2 text-sand"/>
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-ocean-blue p-4">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-bold text-sand mb-2">Rannikot</h1>
        <p className="text-xl text-light-sand">Moninpeli</p>
      </div>
      
      {!playerProfile ? (
        <div className="w-full max-w-md bg-wave-blue/50 p-8 rounded-xl shadow-2xl border border-light-sand/20">
            <h2 className="text-3xl font-bold text-center text-coral mb-6">Tervetuloa!</h2>
            <form onSubmit={handleNameSubmit}>
                <label htmlFor="playerName" className="text-light-sand mb-2 block">Syötä pelaajanimesi:</label>
                <input 
                    id="playerName"
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full p-3 bg-ocean-blue border border-light-sand/50 rounded-md text-sand focus:outline-none focus:ring-2 focus:ring-coral"
                    maxLength={15}
                />
                <button type="submit" className="w-full mt-6 py-3 bg-coral text-white font-bold rounded-lg hover:bg-opacity-80 transition-opacity">
                    Tallenna Nimi
                </button>
            </form>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-wave-blue/50 p-8 rounded-xl shadow-2xl border border-light-sand/20">
          <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-coral">Valitse Roolisi, {playerProfile.name}</h2>
              <p className="text-light-sand">Nykyinen arvo: {playerProfile.rank} ELO</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map(role => (
              <button
                key={role.name}
                onClick={() => onGameStart(playerProfile, role)}
                className="bg-ocean-blue p-6 rounded-lg text-center group hover:bg-coral transition-colors duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-center text-coral group-hover:text-white transition-colors duration-300">{icons[role.name]}</div>
                <h3 className="text-2xl font-bold text-sand group-hover:text-white transition-colors duration-300 mb-2">{role.name}</h3>
                <p className="text-sm text-light-sand group-hover:text-white transition-colors duration-300">{role.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('pre-game');
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null);
  const [finalScores, setFinalScores] = useState<TeamState[]>([]);

  const handleGameStart = (profile: PlayerProfile, playerRole: Role) => {
    setPlayerProfile(profile);
    
    const playerTeam: TeamState = {
      id: 1,
      name: profile.name,
      type: 'human',
      rank: profile.rank,
      role: playerRole,
      resources: { capital: GAME_CONFIG.initialCapital, knowledge: GAME_CONFIG.initialKnowledge },
      sustainabilityPoints: GAME_CONFIG.initialSustainabilityPoints,
      buildings: [],
      bonuses: { capitalIncome: 1.0, knowledgeIncome: 1.0, buildCost: 1.0, attackPower: 1.0 }
    };
    if (playerRole.name === 'Tutkija') playerTeam.bonuses.knowledgeIncome = 1.2;
    if (playerRole.name === 'Insinööri') playerTeam.bonuses.buildCost = 0.9;
    if (playerRole.name === 'Yhteisökoordinaattori') playerTeam.bonuses.capitalIncome = 1.15;


    const opponentTeams: TeamState[] = [
      {
        id: 2,
        name: TIIMIEN_NIMET[1],
        type: 'ai',
        rank: 1250,
        role: (PELAAJIEN_ROOLIT.content as Role[])[Math.floor(Math.random() * 3)],
        resources: { capital: GAME_CONFIG.initialCapital, knowledge: GAME_CONFIG.initialKnowledge },
        sustainabilityPoints: GAME_CONFIG.initialSustainabilityPoints,
        buildings: [],
        bonuses: { capitalIncome: 1.0, knowledgeIncome: 1.0, buildCost: 1.0, attackPower: 1.0 }
      },
      {
        id: 3,
        name: TIIMIEN_NIMET[2],
        type: 'ai',
        rank: 1150,
        role: (PELAAJIEN_ROOLIT.content as Role[])[Math.floor(Math.random() * 3)],
        resources: { capital: GAME_CONFIG.initialCapital, knowledge: GAME_CONFIG.initialKnowledge },
        sustainabilityPoints: GAME_CONFIG.initialSustainabilityPoints,
        buildings: [],
        bonuses: { capitalIncome: 1.0, knowledgeIncome: 1.0, buildCost: 1.0, attackPower: 1.0 }
      }
    ];

    const initialTeams = [playerTeam, ...opponentTeams];
    
    setFinalScores(initialTeams); // Use finalScores to pass initial state to GameUI
    setGameStatus('in-game');
  };

  const handleGameEnd = useCallback((finalTeamStates: TeamState[]) => {
    const sortedScores = [...finalTeamStates].sort((a, b) => b.sustainabilityPoints - a.sustainabilityPoints);
    const playerTeam = finalTeamStates.find(t => t.type === 'human');
    
    if (playerTeam && playerProfile) {
        const playerRank = sortedScores.findIndex(t => t.id === playerTeam.id); // 0, 1, or 2
        let rankChange = 0;
        
        // Simplified ELO change: win against one, lose against one if in middle.
        // 1st place: win vs both
        // 2nd place: lose vs 1st, win vs 3rd
        // 3rd place: lose vs both
        const opponents = sortedScores.filter(t => t.type !== 'human');

        if (playerRank === 0) { // 1st place
           rankChange = Math.round(RANKING_CONFIG.kFactor * (1 - (1 / (1 + Math.pow(10, (opponents[0].rank - playerTeam.rank) / 400))))) +
                        Math.round(RANKING_CONFIG.kFactor * (1 - (1 / (1 + Math.pow(10, (opponents[1].rank - playerTeam.rank) / 400)))));
        } else if (playerRank === 1) { // 2nd place
            const winner = sortedScores[0];
            const loser = sortedScores[2];
            rankChange = Math.round(RANKING_CONFIG.kFactor * (0 - (1 / (1 + Math.pow(10, (winner.rank - playerTeam.rank) / 400))))) +
                         Math.round(RANKING_CONFIG.kFactor * (1 - (1 / (1 + Math.pow(10, (loser.rank - playerTeam.rank) / 400)))));
        } else { // 3rd place
            rankChange = Math.round(RANKING_CONFIG.kFactor * (0 - (1 / (1 + Math.pow(10, (opponents[0].rank - playerTeam.rank) / 400))))) +
                         Math.round(RANKING_CONFIG.kFactor * (0 - (1 / (1 + Math.pow(10, (opponents[1].rank - playerTeam.rank) / 400)))));
        }
        
        const newRank = playerProfile.rank + rankChange;
        const updatedProfile = { ...playerProfile, rank: newRank };
        localStorage.setItem('rannikot_player_profile', JSON.stringify(updatedProfile));
        setPlayerProfile(updatedProfile);
    }
    
    setFinalScores(sortedScores);
    setGameStatus('post-game');
  }, [playerProfile]);
  
  const handlePlayAgain = () => {
      setFinalScores([]);
      setGameStatus('pre-game');
  }

  const renderGameState = () => {
    switch (gameStatus) {
      case 'pre-game':
        return <PreGameLobby onGameStart={handleGameStart} />;
      case 'in-game':
        // Pass initial teams state for the game to start with
        return <GameUI initialTeams={finalScores} onGameEnd={handleGameEnd} humanPlayerId={1} />;
      case 'post-game':
        return <PostGameScreen scores={finalScores} onPlayAgain={handlePlayAgain} playerProfile={playerProfile!} />;
      default:
        return <div>Ladataan...</div>;
    }
  };

  return <div className="bg-ocean-blue font-sans text-sand w-full h-screen overflow-hidden">{renderGameState()}</div>;
};

export default App;
