"use client";

import { useRef, useState } from "react";

const schedule = [
  ["TAPE 13", "RECOVERED 09.12.26", "AVAILABLE"],
  ["ENGINEER LOG 04", "RECOVERED 09.14.26", "SEALED"],
  ["VOICE TEST A/B", "RECOVERED 09.16.26", "SEALED"],
];

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(41.72);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [archiveCode, setArchiveCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [engineerCode, setEngineerCode] = useState("");
  const [fireError, setFireError] = useState(false);
  const [fireUnlocked, setFireUnlocked] = useState(false);
  const [photoEnhanced, setPhotoEnhanced] = useState(false);
  const [photoCode, setPhotoCode] = useState("");
  const [photoError, setPhotoError] = useState(false);
  const [photoUnlocked, setPhotoUnlocked] = useState(false);

  const formatTime = (value: number) => {
    if (!Number.isFinite(value)) return "00:00";
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const toggleTape = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const checkArchiveCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (archiveCode.trim().toUpperCase() === "TOWER") {
      setUnlocked(true);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  const checkEngineerCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (engineerCode.trim().toUpperCase() === "WBLW//3B-0113") {
      setFireUnlocked(true);
      setFireError(false);
    } else {
      setFireError(true);
    }
  };

  const checkPhotoCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (photoCode.trim().toUpperCase() === "MV//05-1998") {
      setPhotoUnlocked(true);
      setPhotoError(false);
    } else {
      setPhotoError(true);
    }
  };

  return (
    <main>
      <div className="warning-strip">ARCHIVE MIRROR // SIGNAL INSTABILITY DETECTED</div>
      <header className="site-header">
        <a className="station" href="#top" aria-label="WBLW archive home">
          <span className="signal-mark" aria-hidden="true"><i/><i/><i/></span>
          <span><strong>WBLW</strong><small>COMMUNITY RADIO ARCHIVE</small></span>
        </a>
        <nav aria-label="Archive navigation">
          <a href="#tapes">Tapes</a>
          <a href="#transcript">Transcripts</a>
          <button onClick={() => setAboutOpen(true)}>About / Safety</button>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">PERSONAL DIGITIZATION PROJECT ยท BELLWETHER COUNTY</p>
          <h1>Some stations<br/><em>never go off air.</em></h1>
          <p className="intro">I found a box of tapes from WBLW, a community station that closed after the transmitter fire in 1998. There were twelve when I brought them home.</p>
          <p className="intro">This morning, there were thirteen.</p>
          <div className="byline"><span>ARCHIVED BY</span><b>Mara Venn</b><span>LAST UPDATE</span><b>01:13 AM</b></div>
        </div>
        <div className="tower-card" aria-label="Illustration of the WBLW broadcast tower">
          <div className="moon"/><div className="radio-wave w1"/><div className="radio-wave w2"/>
          <div className="tower"><div className="light"/><div className="mast"/><div className="leg left"/><div className="leg right"/></div>
          <span className="tower-label">TOWER 3B // DECOMMISSIONED</span>
        </div>
      </section>

      <section className="latest" id="tapes">
        <div className="section-heading"><span>01</span><div><p>NEWEST RECOVERY</p><h2>Tape 13 was not in the box.</h2></div></div>
        <article className="post">
          <div className="post-body">
            <p>I bought a carton of WBLW tapes at an estate sale. Twelve cassettes, numbered 1 through 12 in the same handwriting. This morning, a thirteenth cassette had appeared. Someone had written <b>13</b> on its label.</p>
            <p>The new cassette was warm.</p>
            <p>The recording begins with the sound of a metallic radio switch. A woman starts reading the late-night weather report.</p>
            <p>After her report, there is a short pause and a broken radio glitch. Then a distorted man speaks from the same frequency:</p>
            <blockquote>โ€If you can hear this, the tower has already forgotten you.โ€</blockquote>
            <p>The cassette is marked <b>Tape 13</b>, but the recovered recording lasts only <b>00:42</b> and ends abruptly.</p>
            <p className="question">Who stopped the tapeโ€”and why did they leave the warning?</p>
            <p className="signature">โ€” Mara</p>
          </div>

          <div className="player" aria-label="Tape 13 audio player">
            <audio
              ref={audioRef}
              src={`${assetBase}/tape-13-side-a.mp3`}
              preload="metadata"
              onLoadedMetadata={(event) => {
                const loadedDuration = event.currentTarget.duration;
                if (Number.isFinite(loadedDuration) && loadedDuration > 0) setDuration(loadedDuration);
              }}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              onEnded={() => { setPlaying(false); setCurrentTime(0); }}
            />
            <div className="cassette">
              <div className="tape-label"><span>WBLW ARCHIVE</span><b>TAPE 13</b><small>UNKNOWN DATE ยท SIDE A</small></div>
              <div className="reels"><i className={playing ? "spin" : ""}/><span/><i className={playing ? "spin" : ""}/></div>
            </div>
            <button className="play" onClick={toggleTape} aria-label={playing ? "Pause Tape 13" : "Play Tape 13"}>
              <span>{playing ? "โ…ก" : "โ–ถ"}</span>{playing ? "PAUSE RECORDING" : "PLAY RECORDING"}
            </button>
            <div className="timeline"><span className="progress" style={{width: `${duration ? (currentTime / duration) * 100 : 0}%`}}/></div>
            <div className="time"><span>{formatTime(currentTime)}</span><span>{formatTime(Math.ceil(duration))}</span></div>
            {playing && <p className="audio-note">[ low static ] &nbsp; โ€...the tower has already forgotten you.โ€</p>}
            <p className="file-data">WBLW_T13_SIDEA.MP3 ยท 48 kHz ยท STEREO<br/>DURATION: 00:42 ยท CHECKSUM: <span>VERIFIED</span></p>
          </div>
        </article>
      </section>

      <section className="transcript" id="transcript">
        <div className="section-heading"><span>02</span><div><p>PARTIAL TRANSCRIPT</p><h2>Weather Service Interruption</h2></div></div>
        <div className="paper">
          <div className="paper-meta"><span>WBLW / TAPE 13 / DAMAGED COPY</span><span>RECONSTRUCTED BY M.V.</span></div>
          <p><time>00:01</time> <b>U</b>nder the storm front, visibility will collapse.</p>
          <p><time>00:05</time> <b>P</b>ower interruptions are expected after midnight.</p>
          <p><time>00:10</time> <b>X</b>-band interference has reached Bellwether Ridge.</p>
          <p><time>00:15</time> <b>F</b>orecasters advise residents to remain indoors.</p>
          <p><time>00:20</time> <b>S</b>ervice roads near the northern transmitter are closed.</p>
          <p className="redacted"><time>00:27</time> โ–โ–โ–โ–โ–โ–โ– RADIO GLITCH โ–โ–โ–โ–โ–โ–โ–</p>
          <p className="glitch"><time>00:30</time> SECOND VOICE ENTERS / SOURCE UNKNOWN</p>
          <p><time>00:42</time> [recording cuts off]</p>
          <div className="margin-note">The beginnings survived, but the signal drifted one letter forward. Reverse the drift. โ€” M</div>
        </div>
        <form className="code-entry" onSubmit={checkArchiveCode}>
          <label htmlFor="archive-code">ARCHIVE RECOVERY KEY</label>
          <div><input id="archive-code" value={archiveCode} onChange={(event) => setArchiveCode(event.target.value)} placeholder="ENTER FIVE LETTERS" autoComplete="off"/><button type="submit">VERIFY</button></div>
          {codeError && <p role="alert">KEY REJECTED // SIGNAL UNRESOLVED</p>}
        </form>
        {unlocked && <aside className="unlocked-log" aria-live="polite">
          <p>ARCHIVE ITEM RECOVERED</p><h3>ENGINEER LOG 04</h3>
          <div className="log-meta"><span>DATE: OCTOBER 13, 1998</span><span>ENGINEER: GIDEON VALE</span><span>LOCATION: TRANSMITTER ROOM 3B</span></div>
          <p><time>01:07</time> Emergency broadcast equipment activated without operator input.</p>
          <p><time>01:09</time> Main transmitter disconnected. Broadcast continued for approximately eleven seconds.</p>
          <p><time>01:10</time> A second voice appeared beneath the carrier signal. Voice matched an employee who was not inside the station.</p>
          <p><time>01:11</time> Four encrypted carrier readings recorded:</p>
          <div className="channel-readings"><span>CHANNEL A <b>Y</b></span><span>CHANNEL B <b>W</b></span><span>CHANNEL C <b>N</b></span><span>CHANNEL D <b>I</b></span></div>
          <p><time>01:12</time> System began repeating the name โ€Eli Venn.โ€</p>
          <p><time>01:13</time> Manual shutdown failed.</p>
          <p className="burned">[ THE REMAINDER OF THIS PAGE IS DAMAGED BY FIRE ]</p>
          <blockquote>โ€The first recovery key is the cipher key. Repeat it above the carrier. Count A as zero, then subtract the key. If the tower speaks again, the shutdown failed.โ€</blockquote>
          <div className="auth-fragment">
            <span>SCORCHED MARGIN // PARTIAL AUTHENTICATION FORMAT</span>
            <b>STATION // ROOM - FAILURE TIME</b>
            <small>WORDS DO NOT OPEN INCIDENT FILES.</small>
          </div>
          <span>โ€” GIDEON VALE ยท CHIEF ENGINEER ยท 1998</span>

          <form className="code-entry second-code" onSubmit={checkEngineerCode}>
            <label htmlFor="engineer-code">INCIDENT AUTHENTICATION STRING</label>
            <div><input id="engineer-code" value={engineerCode} onChange={(event) => setEngineerCode(event.target.value)} placeholder="ENTER COMPLETE STRING" autoComplete="off"/><button type="submit">DECODE</button></div>
            {fireError && <p role="alert">KEY REJECTED // CARRIER REMAINS ENCRYPTED</p>}
          </form>

          {!fireUnlocked && <div className="hints">
            <a href="https://discord.com/users/1375722019039084554" target="_blank" rel="noopener noreferrer">ASK FOR A HINT ON DISCORD</a>
            <p className="hint-status">STUCK? CONTACT THE ARCHIVIST. INCLUDE WHICH RECOVERY KEY YOU ARE WORKING ON.</p>
          </div>}

          {fireUnlocked && <div className="fire-reveal">
            <p>ACCESS GRANTED</p><h4>THE FIRE WAS DELIBERATE.</h4>
            <span>Gideon started it to destroy the emergency transmitter. The station continued broadcasting for thirteen seconds after its power was disconnected.</span>
            <b>ATTACHED FILE RECOVERED: STAFF_PHOTO_1998.JPG</b>
          </div>}

          {fireUnlocked && <section className="staff-file" aria-labelledby="staff-photo-title">
            <div className="file-stamp"><span>03 // IMAGE RECOVERY</span><b>STAFF_PHOTO_1998.JPG</b></div>
            <h4 id="staff-photo-title">There are four names on the back.</h4>
            <p className="photo-intro">The photograph was fused to Gideonโ€s log. The paper roster identifies every person in the roomโ€”but the archiveโ€s facial counter keeps returning five.</p>

            <div className={photoEnhanced ? "photo-frame enhanced" : "photo-frame"}>
              <img src={`${assetBase}/staff-photo-1998.png`} alt="Four WBLW employees posing in a radio studio; a faint fifth figure is reflected in the dark control-room glass."/>
              {photoEnhanced && <div className="scan-overlay" aria-live="polite"><span>SUBJECTS DETECTED: 05</span><b>SUBJECT 05 // FACIAL MATCH: M. VENN // 96.4%</b></div>}
            </div>
            <button className="enhance-photo" onClick={() => setPhotoEnhanced(value => !value)}>{photoEnhanced ? "RESTORE ORIGINAL EXPOSURE" : "RUN CONTRAST RECOVERY"}</button>

            <div className="photo-evidence">
              <div className="staff-roster">
                <span>REVERSE-SIDE ROSTER // LEFT TO RIGHT</span>
                <p><b>01</b> GIDEON VALE // CHIEF ENGINEER</p>
                <p><b>02</b> ELI VENN // TRANSMISSION TECHNICIAN</p>
                <p><b>03</b> RUTH MERCER // NEWS</p>
                <p><b>04</b> OWEN PIKE // NIGHT HOST</p>
              </div>
              <div className="catalog-rule">
                <span>CATALOG RULE 8</span>
                <p>Unlisted subjects continue the roster sequence.</p>
                <b>IDENTITY FORMAT:<br/>INITIALS // SUBJECT - YEAR</b>
              </div>
            </div>

            <form className="code-entry photo-code" onSubmit={checkPhotoCode}>
              <label htmlFor="photo-code">SUBJECT 05 IDENTITY STRING</label>
              <div><input id="photo-code" value={photoCode} onChange={(event) => setPhotoCode(event.target.value)} placeholder="ENTER COMPLETE STRING" autoComplete="off"/><button type="submit">IDENTIFY</button></div>
              {photoError && <p role="alert">IDENTITY REJECTED // SUBJECT REMAINS UNLISTED</p>}
            </form>

            {!photoUnlocked && <div className="hints"><a href="https://discord.com/users/1375722019039084554" target="_blank" rel="noopener noreferrer">ASK FOR A HINT ON DISCORD</a></div>}
            {photoUnlocked && <div className="photo-reveal">
              <p>IDENTITY CONFIRMED</p><h4>THE WOMAN IN THE GLASS IS MARA VENN.</h4>
              <span>I was born in 2001. This photograph was developed three years earlier. She is wearing my coat.</span>
              <b>NEXT RECOVERY TARGET: VOICE_TEST_AB.WAV</b>
              <small>โ€” Mara</small>
            </div>}
          </section>}
        </aside>}
      </section>

      <section className="index">
        <div className="section-heading"><span>03</span><div><p>CATALOG INDEX</p><h2>Recovered material</h2></div></div>
        <div className="records">
          {schedule.map(([name,date,status],i)=><div className={status === "SEALED" && !(i === 1 && unlocked) && !(i === 2 && fireUnlocked) ? "record sealed" : "record"} key={name}>
            <span className="record-no">{String(i+1).padStart(2,"0")}</span><div><h3>{name}</h3><p>{date}</p></div><b>{i === 1 && unlocked ? "UNLOCKED" : i === 2 && fireUnlocked ? photoUnlocked ? "IDENTIFIED" : "UNLOCKED" : status}</b>
          </div>)}
        </div>
        <p className="notice">Additional material will be released as it is stabilized. Do not call the number written on the cassette.</p>
      </section>

      <footer>
        <span>WBLW ARCHIVE ยท INDEPENDENT RECOVERY PROJECT</span>
        <button onClick={() => setAboutOpen(true)}>This is a fictional interactive story ยท Safety &amp; content notes</button>
      </footer>

      {aboutOpen && <div className="modal-wrap" role="dialog" aria-modal="true" aria-labelledby="safety-title" onClick={() => setAboutOpen(false)}>
        <section className="modal" onClick={e=>e.stopPropagation()}>
          <button className="close" onClick={() => setAboutOpen(false)} aria-label="Close">ร—</button>
          <p className="eyebrow">OUT OF CHARACTER</p><h2 id="safety-title">About Signal 13</h2>
          <p>This website is part of a fictional mystery-horror game. WBLW, Mara Venn, and the events described here are not real.</p>
          <h3>Content notes</h3><p>Memory loss, disappearance, fire, distorted audio, and mild themes of surveillance.</p>
          <h3>Play safely</h3><p>No clue requires travel, payment, downloads, passwords, private information, or contacting real people. You may stop playing at any time.</p>
          <button className="understood" onClick={() => setAboutOpen(false)}>I understand</button>
        </section>
      </div>}
    </main>
  );
}