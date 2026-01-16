import React, { useState } from 'react';
import {
  FileText,
  Play,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { BatchItem, VerificationResult } from '../types';
import { analyzeSolarImage } from '../services/geminiService';

/* ---------------- INITIAL BATCH ---------------- */

const INITIAL_BATCH: BatchItem[] = [
  { id: 'BATCH-001', lat: 28.6139, lng: 77.2090, status: 'Pending' },
  { id: 'BATCH-002', lat: 19.0760, lng: 72.8777, status: 'Pending' },
  { id: 'BATCH-003', lat: 12.9716, lng: 77.5946, status: 'Pending' },
  { id: 'BATCH-004', lat: 13.0827, lng: 80.2707, status: 'Pending' },
  { id: 'BATCH-005', lat: 22.5726, lng: 88.3639, status: 'Pending' },
];

export const BatchProcessing: React.FC = () => {
  const [items, setItems] = useState<BatchItem[]>(INITIAL_BATCH);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ---------------- RUN BATCH ---------------- */

  const startBatch = async () => {
    setProcessing(true);
    setProgress(0);

    const updated = [...items];

    for (let i = 0; i < updated.length; i++) {
      updated[i].status = 'Processing';
      setItems([...updated]);

      try {
        const result: VerificationResult =
          await analyzeSolarImage('BATCH_PLACEHOLDER');

        updated[i].status = 'Completed';
        updated[i].result = result;
      } catch {
        updated[i].status = 'Failed';
      }

      setItems([...updated]);
      setProgress(Math.round(((i + 1) / updated.length) * 100));
    }

    setProcessing(false);
  };

  /* ---------------- EXPORT CSV ---------------- */

  const exportCSV = () => {
    const headers = [
      'Batch ID',
      'Latitude',
      'Longitude',
      'Status',
      'Solar Installed',
      'Confidence',
      'Roof Type',
      'Timestamp',
    ];

    const rows = items.map((i) => [
      i.id,
      i.lat,
      i.lng,
      i.status,
      i.result?.solarInstalled ?? '',
      i.result?.confidence ?? '',
      i.result?.roofType ?? '',
      i.result?.timestamp ?? '',
    ]);

    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'batch_verification_audit.csv';
    a.click();

    URL.revokeObjectURL(url);
  };

  const statusIcon = (status: string) => {
    if (status === 'Completed')
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'Failed')
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    if (status === 'Processing')
      return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
    return <Clock className="w-5 h-5 text-slate-300" />;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Batch Verification</h2>
          <p className="text-sm text-slate-500">
            Automated verification for multiple rooftop locations
          </p>
        </div>
        <button
          onClick={startBatch}
          disabled={processing}
          className={`flex items-center px-4 py-2 rounded-lg text-white font-medium
          ${processing ? 'bg-slate-400' : 'bg-solar-600 hover:bg-solar-700'}`}
        >
          <Play className="w-4 h-4 mr-2" />
          {processing ? 'Processing…' : 'Start Batch'}
        </button>
      </div>

      {processing && (
        <div className="mb-4">
          <div className="text-xs mb-1 text-slate-500">{progress}%</div>
          <div className="w-full bg-slate-100 h-2 rounded-full">
            <div
              className="bg-solar-500 h-full rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <table className="w-full text-sm">
        <thead className="text-xs uppercase text-slate-500 border-b">
          <tr>
            <th className="py-3">Batch ID</th>
            <th>Location</th>
            <th>Status</th>
            <th>Solar</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((i) => (
            <tr key={i.id}>
              <td className="py-3 font-medium">{i.id}</td>
              <td className="font-mono text-slate-500">
                {i.lat.toFixed(4)}, {i.lng.toFixed(4)}
              </td>
              <td className="flex items-center gap-2 py-3">
                {statusIcon(i.status)}
                {i.status}
              </td>
              <td>{i.result ? (i.result.solarInstalled ? 'YES' : 'NO') : '-'}</td>
              <td>{i.result ? `${i.result.confidence.toFixed(1)}%` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-end">
        <button
          onClick={exportCSV}
          disabled={processing}
          className="flex items-center text-solar-700 font-medium"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Audit CSV
        </button>
      </div>
    </div>
  );
};
