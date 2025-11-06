// Fix: Removed circular import and constants, and defined all necessary types for the application.
export interface Building {
    id: string;
    name: string;
    cost: number;
    points: number;
    description: string;
}

export interface Role {
    name: string;
    description: string;
    abilities: string[];
}

export interface TeamState {
    id: number;
    name: string;
    type: 'human' | 'ai';
    rank: number;
    role: Role;
    resources: {
        capital: number;
        knowledge: number;
    };
    sustainabilityPoints: number;
    buildings: Building[];
    bonuses: {
        capitalIncome: number;
        knowledgeIncome: number;
        buildCost: number;
        attackPower: number;
    };
}

export interface PlayerProfile {
    name: string;
    rank: number;
}

export type GameStatus = 'pre-game' | 'in-game' | 'post-game';

export interface MCQ {
    id: number;
    question: string;
    options: { [key: string]: string };
    answer: string;
    explanation: string;
}

export interface Minigame {
    name: string;
    instructions: string;
    success: string;
    failure: string;
    time: string;
    scoring: string;
}

export interface PvpAction {
    name: string;
    description: string;
    cost: string;
    difficulty: string;
    cooldown: string;
    effect: string;
    defense: string;
}

export interface Section {
    id: string;
    title: string;
    content: any;
}

export interface TextBundleItem {
    key: string;
    value: string;
}

export interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}

export type GameAction =
    | { type: 'APPLY_INCOME' }
    | { type: 'BUILD'; payload: { teamId: number; building: Building } }
    | { type: 'RESEARCH'; payload: { teamId: number } }
    | { type: 'ATTACK'; payload: { attackerId: number; targetId: number; damage: number } }
    | { type: 'AI_BUILD'; payload: { teamId: number } };
