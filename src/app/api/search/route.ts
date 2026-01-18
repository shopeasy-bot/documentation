import { source } from '@/lib/sourcer';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source);
