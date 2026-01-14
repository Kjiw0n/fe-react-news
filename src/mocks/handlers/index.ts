import { pressHandlers } from './news';
import { subscriptionHandlers } from './subscription';

export const handlers = [...pressHandlers, ...subscriptionHandlers];
