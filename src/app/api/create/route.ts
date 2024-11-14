import type { NextRequest } from 'next/server'
import { createDoc } from '@/tools/DataManager';

export function POST(request: NextRequest) {
    return createDoc(request);
}