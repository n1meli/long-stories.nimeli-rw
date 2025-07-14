
'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('es');
  const [voice, setVoice] = useState('female');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language, voice }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="p-4">
      <h1 className="text-xl mb-4 font-bold">AI Video Generator</h1>
      <textarea
        className="w-full h-40 p-2 border"
        placeholder="Enter your story text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-4 flex gap-4">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="es">Spanish</option>
          <option value="ru">Russian</option>
          <option value="fr">French</option>
          <option value="pt">Portuguese</option>
          <option value="it">Italian</option>
          <option value="de">German</option>
          <option value="pl">Polish</option>
          <option value="ar">Arabic</option>
          <option value="tr">Turkish</option>
          <option value="ro">Romanian</option>
          <option value="el">Greek</option>
          <option value="ko">Korean</option>
        </select>
        <select value={voice} onChange={(e) => setVoice(e.target.value)}>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2" onClick={generate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Video'}
        </button>
      </div>

      {result && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-2">Generated Text</h2>
          <pre className="bg-gray-100 p-4 whitespace-pre-wrap">{result.text}</pre>

          <h2 className="text-lg font-bold mt-6 mb-2">Audio</h2>
          <audio controls src={result.audioUrl}></audio>

          <h2 className="text-lg font-bold mt-6 mb-2">Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {result.images.map((url: string, i: number) => (
              <img key={i} src={url} alt={`Generated ${i}`} className="rounded" />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
