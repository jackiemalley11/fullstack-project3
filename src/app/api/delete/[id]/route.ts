import type { NextRequest } from 'next/server'
import { deleteTechnology } from "@/tools/DataManager";

export function DELETE( request: NextRequest, { params }:{ params: { id: string } } ) {
    deleteTechnology(request, params.id);
}
