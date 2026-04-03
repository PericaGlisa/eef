import { useEffect, useState } from 'react';

interface DiagnosticResult {
  timestamp: string;
  apiKeyConfigured: boolean;
  apiKeyPreview: string;
  connectionTest: {
    success: boolean;
    responseTime: number | null;
    statusCode: number | null;
    error: string | null;
    model: string | null;
  };
  environment: {
    nodeEnv?: string;
    netlify?: boolean;
    groqTimeout: number;
    retryAttempts: number;
  };
  testResponse?: string;
}

export default function GroqDiagnostic() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostic = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const isProd = import.meta.env.PROD;
      const apiUrl = isProd ? "/.netlify/functions/chat-diagnostic" : "/api/groq-diagnostic";
      
      const response = await fetch(apiUrl, { method: 'GET' });
      const data = await response.json();
      
      setResult(data);
      
      if (!response.ok || !data.connectionTest.success) {
        setError(data.connectionTest.error || `HTTP ${response.status}`);
      }
    } catch (err: any) {
      setError(err?.message || 'Nepoznata greška prilikom pokretanja dijagnostike');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runDiagnostic();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            🦎 Groq API Dijagnostika
          </h1>
          <p className="text-slate-600 mb-8">
            Testiranje konekcije sa Groq API za AI asistenta kompanije Eko Elektrofrigo
          </p>

          {/* Run Test Button */}
          <div className="mb-8">
            <button
              onClick={runDiagnostic}
              disabled={loading}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Pokreni dijagnostiku...
                </>
              ) : (
                <>
                  <span>🔄</span>
                  Pokreni novi test
                </>
              )}
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <span className="animate-pulse">📡</span>
                Povezivanje sa Groq API...
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-pulse w-2/3" />
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <h3 className="font-bold text-red-800">Greška u konekciji</h3>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className={`p-4 rounded-lg border-2 ${
                result.connectionTest.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">
                    {result.connectionTest.success ? '✅' : '❌'}
                  </span>
                  <div>
                    <h2 className="font-bold text-lg">
                      {result.connectionTest.success 
                        ? 'Konekcija uspešna!' 
                        : 'Konekcija neuspešna'}
                    </h2>
                    <p className="text-sm opacity-80">
                      {result.connectionTest.success 
                        ? 'Groq API radi ispravno' 
                        : 'Proverite podešavanja i pokušajte ponovo'}
                    </p>
                  </div>
                </div>
              </div>

              {/* API Key Info */}
              <div className="p-4 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-slate-700 mb-2">🔑 API Ključ</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Konfigurisan:</span>
                    <span className={`font-semibold ${result.apiKeyConfigured ? 'text-green-600' : 'text-red-600'}`}>
                      {result.apiKeyConfigured ? 'Da ✓' : 'Ne ✗'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Preview:</span>
                    <code className="bg-white px-2 py-1 rounded font-mono">
                      {result.apiKeyPreview}
                    </code>
                  </div>
                </div>
              </div>

              {/* Connection Details */}
              <div className="p-4 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-slate-700 mb-2">📊 Detalji Konekcije</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Model:</span>
                    <p className="font-semibold text-slate-900">
                      {result.connectionTest.model || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-600">Status Code:</span>
                    <p className="font-semibold text-slate-900">
                      {result.connectionTest.statusCode || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-600">Response Time:</span>
                    <p className="font-semibold text-slate-900">
                      {result.connectionTest.responseTime !== null 
                        ? `${result.connectionTest.responseTime}ms` 
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-600">Vreme testa:</span>
                    <p className="font-semibold text-slate-900">
                      {new Date(result.timestamp).toLocaleString('sr-RS')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Environment Info */}
              <div className="p-4 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-slate-700 mb-2">⚙️ Konfiguracija</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Okruženje:</span>
                    <p className="font-semibold text-slate-900">
                      {result.environment.netlify ? 'Netlify (Production)' : result.environment.nodeEnv || 'Development'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-600">Timeout:</span>
                    <p className="font-semibold text-slate-900">
                      {result.environment.groqTimeout}ms
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-600">Retry Attempts:</span>
                    <p className="font-semibold text-slate-900">
                      {result.environment.retryAttempts}
                    </p>
                  </div>
                </div>
              </div>

              {/* Test Response */}
              {result.testResponse && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">💬 Test Odgovor</h3>
                  <blockquote className="text-green-900 italic">
                    "{result.testResponse}"
                  </blockquote>
                </div>
              )}

              {/* Troubleshooting Tips */}
              {!result.connectionTest.success && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h3 className="font-bold text-amber-800 mb-3">🔧 Rešavanje Problema</h3>
                  <ul className="space-y-2 text-sm text-amber-900">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Proverite da li je GROQ_API_KEY pravilno podešen u .env fajlu (lokalno) ili Netlify Environment Variables (produkcija)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Uverite se da API ključ važi i da nije istekao</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Proverite internet konekciju i firewall podešavanja</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Pogledajte Groq status stranicu za moguće outage-ove: <a href="https://status.groq.com" target="_blank" className="underline font-semibold">status.groq.com</a></span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Initial State */}
          {!result && !loading && (
            <div className="text-center py-12 text-slate-500">
              <span className="text-6xl block mb-4">🔍</span>
              Kliknite na "Pokreni novi test" da biste testirali konekciju sa Groq API
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-primary hover:underline font-medium">
            ← Nazad na početnu
          </a>
        </div>
      </div>
    </div>
  );
}
