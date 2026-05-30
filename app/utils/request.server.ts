import { data } from 'react-router';

export const badRequest = <T>(d: T) => data(d, { status: 400 });
