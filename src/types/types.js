export type Action = { type: string, payload: Object };

export type Dispatch = (action: Action | Promise<Action>) => Promise<Action>;
