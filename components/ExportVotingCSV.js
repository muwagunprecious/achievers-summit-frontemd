"use client";
import React from 'react';
import { Download } from 'lucide-react';

export default function ExportVotingCSV({ data }) {
    const handleExport = () => {
        if (!data || data.length === 0) return;

        const headers = ['Vote ID', 'Voter Email', 'Voter IP', 'Category ID', 'Nominee ID', 'Timestamp'];

        const rows = data.map(vote => [
            vote.id,
            vote.voterEmail || 'N/A',
            vote.voterIp || 'N/A',
            vote.categoryId,
            vote.nomineeId,
            new Date(vote.createdAt).toLocaleString()
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `voting_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleExport}
            className="btn btn-primary flex items-center gap-2 group px-6 py-3 rounded-xl"
        >
            <Download size={18} className="group-hover:translate-y-1 transition-transform" />
            <span className="text-xs font-bold tracking-widest uppercase">Export CSV Report</span>
        </button>
    );
}
