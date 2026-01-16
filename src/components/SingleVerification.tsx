import React, { useState, useRef } from 'react';
import {
  Upload,
  MapPin,
  AlertTriangle,
  Check,
  X,
  Loader2,
  ScanEye,
} from 'lucide-react';
import { analyzeSolarImage } from '../services/geminiService';
import { VerificationResult } from '../types';

export const SingleVerification: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------------- IMAGE UPLOAD ---------------- */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  /* ---------------- ANALYSIS ---------------- */

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const base64 = image.split(',')[1] || image;
      const analysis = await analyzeSolarImage(base64);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      alert('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DOWNLOAD AUDIT ---------------- */

  const downloadAudit = () => {
    if (!result) return;

    const audit = {
      latitude: lat || null,
      longitude: lng || null,
      timestamp: result.timestamp,
      solarInstalled: result.solarInstalled,
      confidence: result.confidence,
      roofType: result.roofType,
      reasoning: result.reasoning,
      boundingBox: result.boundingBox ?? null,
    };

    const blob = new Blob([JSON.stringify(audit, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solar_verification_audit.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* INPUT */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-solar-600" />
          Location & Imagery
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
        </div>

        {/* IMAGE BOX */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          ${image ? 'border-solar-400' : 'border-slate-300'}`}
          onClick={() => fileInputRef.current?.click()}
        >
          {image ? (
            <img
              src={image}
              alt="Rooftop"
              className="rounded-lg object-cover w-full"
            />
          ) : (
            <>
              <Upload className="mx-auto mb-3 w-10 h-10 text-solar-600" />
              <p className="font-medium">Upload satellite image</p>
              <p className="text-sm text-slate-500">
                JPEG / PNG only
              </p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button
          disabled={!image || loading}
          onClick={handleAnalyze}
          className={`w-full mt-6 py-3 rounded-lg text-white font-semibold
          ${loading || !image ? 'bg-slate-300' : 'bg-solar-600 hover:bg-solar-700'}`}
        >
          {loading ? (
            <>
              <Loader2 className="inline w-5 h-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <ScanEye className="inline w-5 h-5 mr-2" />
              Run Detection
            </>
          )}
        </button>
      </div>

      {/* RESULT */}
      <div>
        {result ? (
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">Verification Report</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold
                ${result.solarInstalled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                {result.solarInstalled ? 'INSTALLED' : 'NOT DETECTED'}
              </span>
            </div>

            <p className="text-sm text-slate-500 mb-4">
              Generated at {new Date(result.timestamp).toLocaleString()}
            </p>

            <div className="mb-4">
              <p className="text-sm text-slate-500">Confidence</p>
              <p className="text-3xl font-bold">{result.confidence.toFixed(1)}%</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-500">Roof Type</p>
              <p className="font-semibold">{result.roofType}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="font-semibold mb-1">AI Reasoning</p>
              <p className="text-sm">{result.reasoning}</p>
            </div>

            <button
              onClick={downloadAudit}
              className="text-solar-700 font-medium hover:underline"
            >
              Download Audit JSON
            </button>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 border-2 border-dashed rounded-xl">
            <AlertTriangle className="w-8 h-8 mr-2" />
            Awaiting analysis
          </div>
        )}
      </div>
    </div>
  );
};
