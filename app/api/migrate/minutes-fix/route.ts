
import { FixBorders } from "@/utils/migrations/addMostUsed";
import { NextResponse } from "next/server";

export async function GET() {
    //const result = await runMinutesFix();
    //return NextResponse.json({ success: true, stats: result });

    // analyzes dates in sessions and updates hobby dates accordingly
    // try {
    //     const result = await runDateAnalysis();
    //     return NextResponse.json(result);
    // } catch (error: any) {
    //     return NextResponse.json({ 
    //         success: false, 
    //         error: error.message 
    //     }, { status: 500 });
    // }

    // fix date descrepancies
    // try {
        
    //     const result = await runDateFix(false);
    //     return NextResponse.json(result);
    // } catch (error: any) {
    //     return NextResponse.json({ 
    //         success: false, 
    //         error: error.message 
    //     }, { status: 500 });
    // }

    // updates dates for all sessions and hobbies to localtimeformat
    // try {
    //     const result = await updateDates();
    //     return NextResponse.json(result);
    // } catch (error: any) {
    //     return NextResponse.json({ 
    //         success: false, 
    //         error: error.message 
    //     }, { status: 500 });
    // }
    
    // adds frequency usage of times in hobbies
    // try {
    //     const result = await AddMostUsed();
    //     return NextResponse.json(result);
    // } catch (error: any) {
    //     return NextResponse.json({ 
    //         success: false, 
    //         error: error.message 
    //     }, { status: 500 });
    // }

    //fix botders on cal colors
    try {
        const result = await FixBorders();
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}