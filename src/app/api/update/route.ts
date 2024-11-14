import type { NextRequest } from 'next/server'
import { updateDoc } from "@/tools/DataManager";

export function PUT( request: NextRequest ) {
    return updateDoc(request);
}