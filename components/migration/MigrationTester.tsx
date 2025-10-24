import React, { useState } from 'react';
import { Button } from '@mantine/core';

export default function MigrationTester() {
    const [isLoading, setIsLoading] = useState(false);
    const [migrationStats, setMigrationStats] = useState<any>(null);
    const [validationResults, setValidationResults] = useState<any>(null);

    const runMigration = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/migrate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'migrate' })
            });

            const result = await response.json();
            
            if (result.status === 200) {
                setMigrationStats(result.stats);
                console.log('Migration successful!', result.stats);
                alert(`Migration Successful! Migrated ${result.stats.totalEntries} entries across ${result.stats.monthsCreated.length} months`);
            } else {
                console.error('Migration failed:', result.message);
                alert(`Migration Failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Migration error:', error);
            alert('Failed to run migration');
        } finally {
            setIsLoading(false);
        }
    };

    const validateMigration = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/migrate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'validate' })
            });

            const result = await response.json();
            setValidationResults(result);
            
            if (result.isValid) {
                console.log('Validation passed!', result);
                alert('Validation Passed! All entries were migrated successfully');
            } else {
                console.warn('Validation issues:', result);
                alert('Validation Issues: Some entries may not have been migrated correctly');
            }
        } catch (error) {
            console.error('Validation error:', error);
            alert('Failed to validate migration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Data Migration Tool</h1>
            
            <div className="space-y-4 mb-8">
                <p className="text-gray-600">
                    This tool will migrate your existing data structure to the new year/month-based organization.
                </p>
                <p className="text-sm text-gray-500">
                    <strong>Current:</strong> users → entries (all sessions in one array)<br/>
                    <strong>New:</strong> monthly collections → year/month → hobbies → sessions
                </p>
            </div>

            <div className="flex gap-4 mb-8">
                <Button 
                    onClick={runMigration} 
                    loading={isLoading}
                    disabled={isLoading}
                    color="blue"
                >
                    Run Migration
                </Button>
                
                <Button 
                    onClick={validateMigration} 
                    loading={isLoading}
                    disabled={isLoading}
                    variant="outline"
                >
                    Validate Migration
                </Button>
            </div>

            {migrationStats && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">Migration Results</h3>
                    <div className="space-y-2 text-sm">
                        <p><strong>Total Entries Migrated:</strong> {migrationStats.totalEntries}</p>
                        <p><strong>Hobbies Found:</strong> {migrationStats.hobbiesFound.join(', ')}</p>
                        <p><strong>Months Created:</strong> {migrationStats.monthsCreated.length}</p>
                        {migrationStats.errors.length > 0 && (
                            <div>
                                <p className="text-red-600"><strong>Errors:</strong></p>
                                <ul className="list-disc list-inside text-red-600">
                                    {migrationStats.errors.map((error: string, index: number) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {validationResults && (
                <div className={`border rounded-lg p-4 ${validationResults.isValid ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                    <h3 className={`text-lg font-semibold mb-3 ${validationResults.isValid ? 'text-green-800' : 'text-yellow-800'}`}>
                        Validation Results
                    </h3>
                    {validationResults.report && (
                        <div className="space-y-2 text-sm">
                            <p><strong>Original Entries:</strong> {validationResults.report.originalEntries}</p>
                            <p><strong>Migrated Entries:</strong> {validationResults.report.migratedEntries}</p>
                            <p><strong>Monthly Documents:</strong> {validationResults.report.monthlyActivityDocuments}</p>
                            <p><strong>Hobby Metadata Records:</strong> {validationResults.report.hobbyMetadataCount}</p>
                            <p><strong>Status:</strong> 
                                <span className={validationResults.isValid ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>
                                    {validationResults.isValid ? ' ✓ All entries migrated' : ' ⚠ Entry count mismatch'}
                                </span>
                            </p>
                            
                            {validationResults.report.hobbyBreakdown && (
                                <div className="mt-4">
                                    <p><strong>Hobby Breakdown:</strong></p>
                                    <ul className="list-disc list-inside ml-4">
                                        {Object.entries(validationResults.report.hobbyBreakdown).map(([hobby, count]) => (
                                            <li key={hobby}>{hobby}: {count as number} sessions</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Benefits of New Structure</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>Faster queries:</strong> Query specific months/years instead of scanning all data</li>
                    <li>• <strong>Better scaling:</strong> Documents grow incrementally by month</li>
                    <li>• <strong>Easier analytics:</strong> Built-in aggregation by time periods</li>
                    <li>• <strong>Efficient updates:</strong> Only touch relevant month documents</li>
                    <li>• <strong>Data archiving:</strong> Can easily archive old year collections</li>
                </ul>
            </div>
        </div>
    );
}