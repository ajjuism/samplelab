import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import WaveSurfer from "wavesurfer.js";
import "./App.css";

const keyBindings = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I'];

function DrumPad({ keyBinding, sample, index }) {
  const waveSurferRef = useRef(null);
  const waveformRef = useRef(null);

  useEffect(() => {
    if (waveformRef.current && sample) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "turquoise",
        progressColor: "teal",
        cursorColor: "navy",
        barWidth: 3,
      });
      waveSurferRef.current.load(sample.preview);
    }
    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
    };
  }, [sample]);

  const playSample = () => {
    if (sample) {
      waveSurferRef.current.stop();
      waveSurferRef.current.play();
    }
  };

  return (
    <div className="drum-pad" onClick={playSample} data-index={index}>
      {sample && <div ref={waveformRef} className="waveform"></div>}
    </div>
  );
}

function SampleDropzone({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
      <input {...getInputProps()} />
      <p>Drop sample here or click to select</p>
    </div>
  );
}

function App() {
  const [samples, setSamples] = useState(Array(8).fill(null));

  const handleDrop = (acceptedFiles, index) => {
    const file = acceptedFiles[0];
    const preview = URL.createObjectURL(file);
    setSamples((prevSamples) => {
      const newSamples = [...prevSamples];
      newSamples[index] = { ...file, preview };
      return newSamples;
    });
  };

  const handleKeyDown = (event) => {
    const index = keyBindings.findIndex((key) => key.toLowerCase() === event.key.toLowerCase());
    if (index !== -1) {
      const drumPadElement = document.querySelector(`.drum-pad[data-index="${index}"]`);
      if (drumPadElement) {
        drumPadElement.click();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [samples]);

  return (
    <div className="App">
      <div className="logo-container">
        {/* <img src="/public/logo.png" alt="Sample Lab Logo" className="logo" /> */}
      </div>
      <h1>Sample Lab</h1>
      <div className="drum-pads">
        {samples.map((sample, index) => (
          <div key={index} className="drum-pad-container">
            <DrumPad keyBinding={keyBindings[index]} sample={sample} index={index} />
            <SampleDropzone
              onDrop={(acceptedFiles) => handleDrop(acceptedFiles, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
