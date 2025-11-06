import React from 'react';
import { TeamState, PlayerProfile } from '../types';

interface PostGameScreenProps {
  scores: TeamState[];
  onPlayAgain: () => void;
  playerProfile: PlayerProfile;
}

const PostGameScreen: React.FC<PostGameScreenProps> = ({ scores, onPlayAgain, playerProfile }) => {
  const getMedal = (index: number) => {
    if (index === 0) return '🏆';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  const oldRank = scores.find(t => t.type === 'human')?.rank || playerProfile.rank;
  const rankChange = playerProfile.rank - oldRank;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-ocean-blue p-4 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-bold text-sand mb-2">Peli Päättyi!</h1>
        <p className="text-xl text-light-sand">Lopputulokset</p>
      </div>
      <div className="w-full max-w-2xl bg-wave-blue/50 p-8 rounded-xl shadow-2xl border border-light-sand/20">
        <div className="text-center mb-6">
            <h3 className="text-2xl text-sand">Ranking-pisteesi:</h3>
            <p className="text-4xl font-bold text-coral">
                {playerProfile.rank} 
                <span className={rankChange >= 0 ? 'text-green-400' : 'text-red-400'}>
                   ({rankChange >= 0 ? '+' : ''}{rankChange})
                </span>
            </p>
        </div>
        <ul className="space-y-4">
          {scores.map((team, index) => (
            <li
              key={team.id}
              className={`flex items-center justify-between p-4 rounded-lg ${index === 0 ? 'bg-coral/80' : 'bg-ocean-blue'} ${team.type === 'human' ? 'ring-2 ring-coral' : ''}`}
            >
              <div className="flex items-center">
                <span className="text-3xl font-bold w-12">{getMedal(index)}</span>
                <div>
                    <span className={`text-2xl font-semibold ${index === 0 ? 'text-white' : 'text-sand'}`}>{team.name}</span>
                    {team.type === 'human' && <span className="text-xs text-light-sand ml-2">(Sinä)</span>}
                </div>
              </div>
              <div className={`text-2xl font-bold ${index === 0 ? 'text-white' : 'text-coral'}`}>
                {team.sustainabilityPoints} KP
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onPlayAgain}
        className="mt-10 px-8 py-4 bg-coral text-white text-2xl font-bold rounded-lg hover:bg-opacity-80 transition-opacity transform hover:scale-105"
      >
        Pelaa Uudelleen
      </button>
    </div>
  );
};

export default PostGameScreen;
