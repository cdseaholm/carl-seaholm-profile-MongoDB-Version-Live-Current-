import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { MigrateToNewStructure } from "@/utils/migrations/migrateToMonthlyStructure";

export async function POST() {
    try {
        const session = await getServerSession();
        
        if (!session || !session.user?.email) {
            return NextResponse.json({ 
                success: false, 
                error: 'Unauthorized' 
            }, { status: 401 });
        }

        const userEmail = session.user.email;
        const result = await MigrateToNewStructure(userEmail);
        
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Migration API error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error.message || 'Migration failed' 
        }, { status: 500 });
    }
}