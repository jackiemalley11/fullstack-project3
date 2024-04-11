import type { NextRequest } from 'next/server'
import { createTechnology } from '@/tools/DataManager';

export async function POST(request: NextRequest) {
    // response.send("request received!");
    return await createTechnology(request);
}