import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import { TeamState, Notification as NotificationType, Building, MCQ, GameAction, Role } from '../types';
import { GAME_CONFIG, RAKENNUKSET, MINIPELIT_JA_KYSYMYKSET, PELAAJIEN_ROOLIT } from '../constants';
import QuestionModal from './QuestionModal';
import { BanknotesIcon, LightBulbIcon, HeartIcon, UsersIcon, WrenchScrewdriverIcon, AcademicCapIcon, BoltIcon, ShieldCheckIcon } from './Icons';

interface GameUIProps {
  initialTeams: TeamState[];
  onGameEnd: (finalTeamStates: TeamState[]) => void;
  humanPlayerId: number;
}

const gameReducer = (state: TeamState[], action: GameAction): TeamState[] => {
    switch (action.type) {
        case 'APPLY_INCOME':
            return state.map(team => {
                const capitalBonus = team.buildings.some(b => b.id === 'b3') ? 1.5 : 1.0;
                const knowledgeBonus = team.buildings.some(b => b.id === 'b2') ? 1.3 : 1.0;
                return {
                    ...team,
                    resources: {
                        capital: team.resources.capital + Math.round(GAME_CONFIG.passiveCapital * team.bonuses.capitalIncome * capitalBonus),
                        knowledge: team.resources.knowledge + Math.round(GAME_CONFIG.passiveKnowledge * team.bonuses.knowledgeIncome * knowledgeBonus),
                    }
                };
            });
        case 'BUILD': {
            const { teamId, building } = action.payload;
            return state.map(t => {
                if (t.id === teamId) {
                    const cost = Math.round(building.cost * t.bonuses.buildCost);
                    return {
                        ...t,
                        resources: { ...t.resources, capital: t.resources.capital - cost },
                        sustainabilityPoints: t.sustainabilityPoints + building.points,
                        buildings: [...t.buildings, building]
                    };
                }
                return t;
            });
        }
        case 'RESEARCH': {
            const { teamId } = action.payload;
            const cost = 100;
            return state.map(t => t.id === teamId ? {
                ...t,
                resources: { ...t.resources, knowledge: t.resources.knowledge - cost },
                sustainabilityPoints: t.sustainabilityPoints + 75,
            } : t);
        }
        case 'ATTACK': {
            const { attackerId, targetId, damage } = action.payload;
            const cost = 80;
             return state.map(t => {
              if (t.id === targetId) {
                  return {...t, sustainabilityPoints: Math.max(0, t.sustainabilityPoints - damage) };
              }
              if (t.id === attackerId) {
                  return {...t, resources: {...t.resources, capital: t.resources.capital - cost } };
              }
              return t;
          });
        }
        case 'AI_BUILD': {
            const { teamId } = action.payload;
            return state.map(t => t.id === teamId ? { ...t, sustainabilityPoints: t.sustainabilityPoints + 25 } : t);
        }
        default:
            return state;
    }
};

const GameUI: React.FC<GameUIProps> = ({ initialTeams, onGameEnd, humanPlayerId }) => {
  const [teams, dispatch] = useReducer(gameReducer, initialTeams);
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.gameDuration);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [showQuestionModal, setShowQuestionModal] = useState<MCQ | null>(null);
  const [actionOnSuccess, setActionOnSuccess] = useState<(() => void) | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const playerTeam = useMemo(() => teams.find(t => t.id === humanPlayerId)!, [teams, humanPlayerId]);

  const addNotification = useCallback((message: string, type: NotificationType['type']) => {
    setNotifications(prev => [{ id: Date.now(), message, type }, ...prev.slice(0, 4)]);
  }, []);
  
  const getBuildingBonusText = (building: Building): string => {
    switch (building.id) {
        case 'b2':
            return 'Bonus: +30% passiivinen Tieto-tuotto.';
        case 'b3':
            return 'Bonus: +50% passiivinen Pääoma-tuotto.';
        case 'b1': 
        case 'b4': 
        default:
            return building.description;
    }
  };
  
  // Game Timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onGameEnd(teams);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onGameEnd, teams, isPaused]);
  
  // Passive Income Timer
  useEffect(() => {
    if (isPaused) return;
    const incomeTimer = setInterval(() => {
        dispatch({ type: 'APPLY_INCOME' });
    }, GAME_CONFIG.passiveIncomeInterval);
    return () => clearInterval(incomeTimer);
  }, [isPaused]);

  // AI Opponent Logic Timer
  useEffect(() => {
    if (isPaused) return;
    const aiTimer = setInterval(() => {
        teams.forEach(team => {
            if (team.type === 'ai') {
                const player = teams.find(t => t.type === 'human')!;
                const otherAi = teams.find(t => t.type === 'ai' && t.id !== team.id);
                const potentialTargets = [player, otherAi].filter(Boolean) as TeamState[];
                
                if (Math.random() < GAME_CONFIG.aiAttackChance && potentialTargets.length > 0) {
                    // AI attacks
                    const target = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
                    const damage = 50 + Math.floor(Math.random() * 50); // 50-100 damage
                    dispatch({ type: 'ATTACK', payload: { attackerId: team.id, targetId: target.id, damage: damage} });
                    addNotification(`${team.name} hyökkäsi pelaajan ${target.name} kimppuun! (-${damage} KP)`, 'error');
                } else {
                    // AI builds
                    dispatch({ type: 'AI_BUILD', payload: { teamId: team.id } });
                    addNotification(`${team.name} kehittää aluettaan.`, 'info');
                }
            }
        });
    }, GAME_CONFIG.aiActionInterval);
    return () => clearInterval(aiTimer);
  }, [isPaused, teams, addNotification]);

  const handleQuestionClose = (success: boolean) => {
    setShowQuestionModal(null);
    setIsPaused(false);
    if (success && actionOnSuccess) {
      actionOnSuccess();
    } else if(!success) {
      addNotification('Tehtävä epäonnistui!', 'error');
    }
    setActionOnSuccess(null);
  };

  const triggerQuestion = (onSuccess: () => void) => {
    const questions = MINIPELIT_JA_KYSYMYKSET.content.questions;
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setActionOnSuccess(() => onSuccess);
    setShowQuestionModal(randomQuestion);
    setIsPaused(true);
  };
  
  const handleBuildAction = (building: Building) => {
      const cost = Math.round(building.cost * playerTeam.bonuses.buildCost);
      if (playerTeam.resources.capital < cost) {
          addNotification('Ei tarpeeksi Pääomaa rakentamiseen!', 'error');
          return;
      }
      triggerQuestion(() => {
          dispatch({ type: 'BUILD', payload: { teamId: playerTeam.id, building } });
          addNotification(`${playerTeam.name} rakensi: ${building.name}!`, 'success');
      });
  };

  const handleResearchAction = () => {
      const cost = 100;
      if (playerTeam.resources.knowledge < cost) {
          addNotification('Ei tarpeeksi Tieto-resurssia!', 'error');
          return;
      }
      triggerQuestion(() => {
          dispatch({ type: 'RESEARCH', payload: { teamId: playerTeam.id } });
          addNotification(`${playerTeam.name} tutki uutta teknologiaa!`, 'success');
      });
  };
  
  const handleAttackAction = (targetId: number) => {
    const cost = 80;
     if (playerTeam.resources.capital < cost) {
          addNotification('Ei tarpeeksi Pääomaa hyökkäykseen!', 'error');
          return;
      }
      
       triggerQuestion(() => {
          const damage = 100;
          dispatch({ type: 'ATTACK', payload: { attackerId: playerTeam.id, targetId: targetId, damage }});
          const target = teams.find(t => t.id === targetId);
          addNotification(`${playerTeam.name} hyökkäsi pelaajan ${target?.name} kimppuun!`, 'warning');
      });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4 bg-ocean-blue">
      {showQuestionModal && <QuestionModal question={showQuestionModal} onClose={handleQuestionClose} />}
      <header className="flex justify-between items-center bg-wave-blue/50 p-3 rounded-lg border border-light-sand/20">
        <h1 className="text-2xl font-bold text-sand">Rannikot</h1>
        <div className="text-center">
            <div className="text-3xl font-bold text-coral">{formatTime(timeLeft)}</div>
            <div className="text-sm text-light-sand">Aikaa jäljellä</div>
        </div>
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2" title="Pääoma">
                <BanknotesIcon className="w-7 h-7 text-green-400" />
                <span className="text-xl font-semibold">{playerTeam.resources.capital}</span>
            </div>
            <div className="flex items-center gap-2" title="Tieto">
                <LightBulbIcon className="w-7 h-7 text-yellow-400" />
                <span className="text-xl font-semibold">{playerTeam.resources.knowledge}</span>
            </div>
             <div className="flex items-center gap-2" title="Kestävyyspisteet">
                <HeartIcon className="w-7 h-7 text-red-400" />
                <span className="text-xl font-semibold">{playerTeam.sustainabilityPoints}</span>
            </div>
        </div>
      </header>
      <main className="flex-1 flex gap-4 overflow-hidden">
        <aside className="w-1/4 flex flex-col gap-4">
            <div className="bg-wave-blue/50 p-4 rounded-lg border border-light-sand/20 flex-shrink-0">
                <h2 className="text-xl font-bold text-coral mb-2">{playerTeam.name} ({playerTeam.rank} ELO)</h2>
                <div className="flex items-center gap-2 text-sand">
                    <UsersIcon className="w-6 h-6" />
                    <span>{playerTeam.role?.name}</span>
                </div>
            </div>
            <div className="bg-wave-blue/50 p-4 rounded-lg border border-light-sand/20 flex-1 overflow-y-auto">
                <h3 className="text-lg font-bold text-sand mb-3">Omat Rakennukset</h3>
                <div className="space-y-2">
                    {playerTeam.buildings.length > 0 ? playerTeam.buildings.map((b, i) => (
                        <div key={i} className="relative group cursor-help">
                            <div className="bg-ocean-blue p-2 rounded">{b.name}</div>
                            <div className="absolute left-0 bottom-full mb-2 w-max max-w-xs bg-ocean-blue border border-light-sand/50 text-sand text-sm rounded-lg shadow-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                {getBuildingBonusText(b)}
                            </div>
                        </div>
                    )) : <p className="text-light-sand text-sm">Ei rakennuksia.</p>}
                </div>
            </div>
        </aside>
        <section className="w-1/2 bg-wave-blue/50 p-4 rounded-lg border border-light-sand/20 overflow-y-auto">
            <h2 className="text-xl font-bold text-sand mb-4">Pelaajat</h2>
            <div className="space-y-3">
                {teams.map(team => (
                    <div key={team.id} className={`p-3 rounded-lg flex justify-between items-center ${team.id === humanPlayerId ? 'bg-light-sand/20' : 'bg-ocean-blue'}`}>
                        <div>
                            <h3 className="font-bold">{team.name} <span className="text-sm text-light-sand">({team.rank} ELO)</span></h3>
                            <div className="flex items-center gap-4 text-sm text-light-sand">
                                <span className="flex items-center gap-1"><UsersIcon className="w-4 h-4" /> {team.role?.name}</span>
                                <span className="flex items-center gap-1"><HeartIcon className="w-4 h-4 text-red-400" /> {team.sustainabilityPoints} KP</span>
                            </div>
                        </div>
                        {team.id !== humanPlayerId && (
                             <button onClick={() => handleAttackAction(team.id)} className="px-4 py-2 bg-coral text-white font-bold rounded-lg hover:bg-opacity-80 transition-opacity text-sm">Hyökkää</button>
                        )}
                    </div>
                ))}
            </div>
        </section>
        <aside className="w-1/4 flex flex-col gap-4">
            <div className="bg-wave-blue/50 p-4 rounded-lg border border-light-sand/20">
                <h3 className="text-lg font-bold text-sand mb-3">Toiminnot</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <button onClick={handleResearchAction} className="flex flex-col items-center p-3 bg-light-sand/20 rounded hover:bg-light-sand/40 transition-colors">
                        <AcademicCapIcon className="w-7 h-7 mb-1 text-yellow-300"/>
                        <span className="text-sm">Tutki</span>
                    </button>
                     <button className="flex flex-col items-center p-3 bg-light-sand/20 rounded hover:bg-light-sand/40 transition-colors cursor-not-allowed opacity-50" title="Puolustus (automaattinen)">
                        <ShieldCheckIcon className="w-7 h-7 mb-1 text-blue-300"/>
                        <span className="text-sm">Puolusta</span>
                    </button>
                 </div>
                 <h4 className="text-md font-semibold text-sand mt-4 mb-2">Rakenna:</h4>
                 <div className="space-y-2">
                    {RAKENNUKSET.map(b => (
                        <button key={b.id} onClick={() => handleBuildAction(b)} className="w-full text-left p-2 bg-light-sand/20 rounded hover:bg-light-sand/40 transition-colors flex justify-between items-center">
                            <span>{b.name}</span>
                            <span className="text-sm font-mono text-green-300">{Math.round(b.cost * playerTeam.bonuses.buildCost)}€</span>
                        </button>
                    ))}
                 </div>
            </div>
             <div className="bg-wave-blue/50 p-4 rounded-lg border border-light-sand/20 flex-1 overflow-y-auto">
                <h3 className="text-lg font-bold text-sand mb-3">Tapahtumaloki</h3>
                <div className="space-y-2">
                    {notifications.map(n => (
                        <div key={n.id} className={`text-sm p-2 rounded animate-fade-in-left ${
                            n.type === 'error' ? 'bg-red-500/30 text-red-100' : 
                            n.type === 'warning' ? 'bg-yellow-500/30 text-yellow-100' : 
                            n.type === 'success' ? 'bg-green-500/30 text-green-100' : 
                            'bg-ocean-blue text-light-sand'}`}>
                            {n.message}
                        </div>
                    ))}
                </div>
            </div>
        </aside>
      </main>
    </div>
  );
};

export default GameUI;
