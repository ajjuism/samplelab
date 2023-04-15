import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import WaveSurfer from "wavesurfer.js";
import "./App.css";
import FAQ from './FAQ';
import Footer from './Footer';
import Navbar from './Navbar';

const keyBindings = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I'];

function DrumPad({ keyBinding, sample, index }) {
  const waveSurferRef = useRef(null);
  const waveformRef = useRef(null);

  useEffect(() => {
    if (waveformRef.current && sample) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "teal",
        progressColor: "turquoise",
        cursorColor: "#0067A5",
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
      waveSurferRef.current.play();    }
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
      <p className="dropzone-text-large">Drop sample here or click to select</p>
      <p className="dropzone-text-small">Tap to select sample</p>
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
<Navbar />  
      <div className="instruction-card">
        <div className="instruction-icon">
          <i className="fas fa-info-circle"></i>
        </div>
        <p className="instruction-text-large">
          Upload your samples by dragging and dropping or clicking the sample slots. Press the corresponding keyboard keys (Q, W, E, R, T, Y, U, I) to play the samples.
        </p>
        <p className="instruction-text-small">
          Upload your samples by tapping on the "Tap to select sample" button. Press or tap the drum pads to play the samples.
        </p>
      </div>
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
      <FAQ /> {/* Add the FAQ component here */}
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}

export default App;
