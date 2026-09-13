"use client";

import { FormEvent, useEffect, useState } from "react";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || "";
const progressKey = "wblw-signal-13-progress";

export default function VoiceTestPage() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(progressKey) || "{}");
      setSolved(saved.chapter4Solved === true);
    } catch {}
  }, []);

  const verify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (answer.trim().toUpperCase() !== "TDXFRNG") {
      setError(true);
      return;
    }
    setSolved(true);
    setError(false);
    try {
      const saved = JSON.parse(localStorage.getItem(progressKey) || "{}");
      localStorage.setItem(progressKey, JSON.stringify({...saved, chapter4Solved: true}));
    } catch {}
  };

  return <main className="voice-page">
    <div className="fiction-strip">FICTIONAL ONLINE MYSTERY // NO REAL EMERGENCY</div>
    <header className="voice-header">
      <a href={`${assetBase}/`}>← RETURN TO ARCHIVE</a>
      <span>WBLW // UNLISTED DIRECTORY</span>
    </header>

    <section className="voice-terminal">
      <div className="terminal-head"><span>04 // VOICE COMPARISON</span><i>LINK ACTIVE</i></div>
      <p className="terminal-kicker">RECOVERED FILE: VOICE_TEST_AB</p>
      <h1>One voice. Two recordings.<br/><em>Twenty-eight years apart.</em></h1>
      <p className="terminal-intro">Both files identify the operator as Eli Venn. Test A was logged in 1998. Test B has no date, but its creation stamp reads tomorrow. No automated transcript could be recovered.</p>

      <div className="voice-grid">
        <article className="voice-card">
          <div><span>TEST A</span><b>ARCHIVE MASTER // 1998</b></div>
          <img src={`${assetBase}/waveform-test-a.svg`} alt="Waveform for Voice Test A"/>
          <audio controls preload="metadata" src={`${assetBase}/voice-test-a.mp3`}>Your browser does not support audio.</audio>
          <p>CARRIER: STABLE<br/>OPERATOR: ELI VENN</p>
        </article>
        <article className="voice-card corrupt">
          <div><span>TEST B</span><b>DATE: [INVALID]</b></div>
          <img src={`${assetBase}/waveform-test-b.svg`} alt="Waveform for Voice Test B"/>
          <audio controls preload="metadata" src={`${assetBase}/voice-test-b.mp3`}>Your browser does not support audio.</audio>
          <p>CARRIER: UNSTABLE<br/>OPERATOR: ELI VENN</p>
        </article>
      </div>

      <section className="residual manual-sheet">
        <span>MANUAL VOICE-PRINT CALIBRATION // MARGIN NOTE</span>
        <p className="manual-warning">AUTOMATIC TRANSCRIPTION FAILED // LISTEN AND TRANSCRIBE BY HAND</p>
        <blockquote className="audio-riddle">Seven breaths from each recording. Begin where every breath begins. Give the beginnings their proper place in the alphabet, then let A and B speak together. Anything that passes Z returns through A.</blockquote>
        <small>— unsigned note found beneath the waveform printout</small>
      </section>

      {!solved && <form className="voice-answer" onSubmit={verify}>
        <label htmlFor="residual-answer">RECOVERED WORD</label>
        <div><input id="residual-answer" value={answer} onChange={e => setAnswer(e.target.value)} autoComplete="off" maxLength={12}/><button>VERIFY</button></div>
        {error && <p role="alert">WORD REJECTED // LISTEN FOR SEVEN BEGINNINGS IN EACH TEST</p>}
      </form>}

      {solved && <section className="mara-note" aria-live="polite">
        <span>ARCHIVIST NOTE // M. VENN</span>
        <p>Test B uses Eli’s voice. The file says it was created tomorrow.</p>
        <p>I checked the room while it played. The microphone was already on.</p>
        <b>CHAPTER 4 // DECODED</b>
      </section>}
    </section>
  </main>;
}
