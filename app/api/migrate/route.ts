import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { MigrateToNewStructure, validateMigration } from "@/utils/migrations/migrateToMonthlyStructure";

export async function POST(req: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET || '';
    
    if (secret === '') {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    const session = await getServerSession({ req, secret });
    const token = await getToken({ req, secret });

    if (!session || !token) {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    try {
        const body = await req.json();
        const { action } = body;
        
        const userEmail = session.user?.email;
        if (!userEmail) {
            return NextResponse.json({ status: 401, message: 'User email not found' });
        }

        if (action === 'migrate') {
            console.log(`Starting migration for user: ${userEmail}`);
            const result = await MigrateToNewStructure(userEmail);
            
            return NextResponse.json({
                status: result.success ? 200 : 500,
                message: result.success ? 'Migration completed successfully' : 'Migration failed',
                stats: result.stats
            });
            
        } else if (action === 'validate') {
            console.log(`Validating migration for user: ${userEmail}`);
            const result = await validateMigration(userEmail);
            
            return NextResponse.json({
                status: 200,
                message: 'Validation completed',
                isValid: result.isValid,
                report: result.report
            });
            
        } else {
            return NextResponse.json({ 
                status: 400, 
                message: 'Invalid action. Use "migrate" or "validate"' 
            });
        }

    } catch (error) {
        console.error('Migration API error:', error);
        return NextResponse.json({ 
            status: 500, 
            message: 'Internal server error',
            error: error?.toString()
        });
    }
}