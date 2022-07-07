import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import * as Tone from "tone";
import { Player } from "tone";
import Sound from "../components/onglaocheodo.mp3";
import { useRef, useState, useEffect } from "react";
import useDynamicRefs from "use-dynamic-refs";
import { data } from "../components/data";

import { Button } from "../components/Button";

import boatImg from "../components/boat_people.jpg";
import { DataComponet } from "../components/DataComponent";

import { PlayIcon, StopIcon } from "@heroicons/react/outline";

export default function Home() {
  const [value, setValue] = useState(0);
  const [loop, setLoop] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentYear, setCurrentYear] = useState(null);

  const playerRef = useRef(null);
  const distRef = useRef(null);
  const distRef2 = useRef(null);
  const distRef3 = useRef(null);
  const distRef4 = useRef(null);

  const i = 0;
  const max = 543536;
  const min = 0;

  const normalize = (val) => (val - min) / (max - min);

  useEffect(() => {
    playerRef.current = new Player(Sound, setAudioLoaded(true)).toDestination();
    distRef.current = new Tone.Distortion(1).toDestination();
    distRef2.current = new Tone.Distortion(1).toDestination();
    distRef3.current = new Tone.Distortion(1).toDestination();
    distRef4.current = new Tone.Distortion(1).toDestination();
  }, []);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.loop = loop;
    playerRef.current.volume.value = value;
  }, [loop, value]);

  const play = () => {
    playerRef.current.connect(distRef.current);
    playerRef.current.connect(distRef2.current);
    playerRef.current.connect(distRef3.current);
    playerRef.current.connect(distRef4.current);
    playerRef.current.start();
    playerRef.current.loop = true;
    setIsPlaying(true);
  };

  const stop = () => {
    playerRef.current.disconnect();
    playerRef.current.stop();
    setIsPlaying(false);
  };

  const handlePlay = () => {
    console.log("HI");
    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (!currentYear) setCurrentYear(data[0]);
    const interval = setInterval(() => {
      if (i > 53) {
        i = 0;
      }
      console.log(i);
      const refugeeByYear = normalize(
        data[i]["Refugees under UNHCR's mandate"]
      );

      setCurrentYear(data[i]);

      distRef.current.wet.value = refugeeByYear;
      distRef2.current.wet.value = refugeeByYear;
      distRef3.current.wet.value = refugeeByYear;
      distRef4.current.wet.value = refugeeByYear;
      i++;
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="h-screen flex items-center">
      <Head>
        <title>Boat</title>
        <meta name="description" content="Vietnamese refugee data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full">
        <div className="flex space-x-8 h-full">
          <div className="flex-1 space-y-4 justify-center flex flex-col pl-16">
            <div className="flex items-center">
              <h1 className="text-lg font-bold">From the Sea</h1>
              <div className="order-first">
                {audioLoaded ? (
                  <>
                    {!isPlaying ? (
                      <Button onClick={play}>
                        <PlayIcon className="w-6" />
                      </Button>
                    ) : (
                      <Button onClick={stop}>
                        <StopIcon className="w-6" />
                      </Button>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="w-64">
              <Image
                src={boatImg}
                alt="Picture of the author"
                width="2448"
                height="1608px"
              />
            </div>
            <p>
              On April 30, 1975, Sài Gòn fell, sparking a humanitarian crisis
              which sees a mass exodus between 1975 and 1995 as many Southern
              Vietnamese people were displaced. Over 800,000 Vietnamese people
              traveled to nearby countries by small boats not meant for open
              sea, where they interred at refugee camps to await their fate.
              Those came to be known as boat people. They had to face storms,
              diseases, starvation, and elude pirates, and an estimated
              200,000-400,000 boat people died at sea.
            </p>
            <p>
              This migration and humanitarian crisis was at its highest in 1978
              and 1979, but continued through the early 1990s and even today.
            </p>
            <p>
              In this project, a traditional Southern Vietnamese opera, cải
              lương, is played by speakers enclosed in the form of a traditional
              Vietnamese fishing boat. The music is distorted by the number of
              refugees each year using data collected by the UNHCR.
            </p>
            <p>
              <a
                className="text-sm underline text-blue-400 "
                href="https://www.unhcr.org/refugee-statistics/download/?url=CwE2k9"
              >
                UNHCR Refugee Statistics
              </a>
            </p>
          </div>
          <div className="flex-1 space-y-8 m-auto pr-16 bg-gray-200 h-full flex items-center justify-center">
            <div className="flex space-x-4 items-center justify-center">
              {currentYear ? (
                <DataComponet
                  year={currentYear["Year"]}
                  refugeeNumber={addCommas(
                    currentYear["Refugees under UNHCR's mandate"]
                  )}
                />
              ) : (
                <>
                  {audioLoaded ? (
                    <>
                      {!isPlaying ? (
                        <Button onClick={play}>
                          <PlayIcon className="w-16" />
                        </Button>
                      ) : (
                        <Button onClick={stop}>Stop</Button>
                      )}
                    </>
                  ) : (
                    "Loading Audio"
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const addCommas = (nStr) => {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
};
