import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @Endpoint - POST /api/upload
 * @description - Uploads a file to the vercel blob storage.
 * @returns - The uploaded file. (the blob contains the url of the uploaded file)
 */
export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');

    if (!filename) {
        return NextResponse.json({ error: 'filename is required' }, { status: 400 });
    }

    if (!req.body) {
        return NextResponse.json({ error: 'file is required' }, { status: 400 });
    }

    const blob = await put(filename, req.body, { 
        access: 'public' 
    });

    return NextResponse.json(blob);
}