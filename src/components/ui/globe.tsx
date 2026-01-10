"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

const hexToRgbNormalized = (hex: string): [number, number, number] => {
  let r = 0,
    g = 0,
    b = 0;
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    return [0, 0, 0];
  }
  return [r / 255, g / 255, b / 255];
};

interface GlobeProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number] | string;
  markerColor?: [number, number, number] | string;
  glowColor?: [number, number, number] | string;
  size?: number;
}

export function Globe({
  className,
  theta = 0.25,
  dark = 1,
  scale = 1.02,
  diffuse = 1.2,
  mapSamples = 40000,
  mapBrightness = 6,
  baseColor = "#1a1a1a",
  markerColor = "#e97714",
  glowColor = "#e97714",
  size = 420,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(0);
  const thetaRef = useRef(theta);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const autoRotateSpeed = 0.002;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resolvedBaseColor: [number, number, number] =
      typeof baseColor === "string"
        ? hexToRgbNormalized(baseColor)
        : baseColor;

    const resolvedMarkerColor: [number, number, number] =
      typeof markerColor === "string"
        ? hexToRgbNormalized(markerColor)
        : markerColor;

    const resolvedGlowColor: [number, number, number] =
      typeof glowColor === "string"
        ? hexToRgbNormalized(glowColor)
        : glowColor;

    const initGlobe = () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }

      const devicePixelRatio = window.devicePixelRatio || 1;
      const internalWidth = size * devicePixelRatio;
      const internalHeight = size * devicePixelRatio;

      canvas.width = internalWidth;
      canvas.height = internalHeight;

      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: devicePixelRatio,
        width: internalWidth,
        height: internalHeight,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: dark,
        scale: scale,
        diffuse: diffuse,
        mapSamples: mapSamples,
        mapBrightness: mapBrightness,
        baseColor: resolvedBaseColor,
        markerColor: resolvedMarkerColor,
        glowColor: resolvedGlowColor,
        opacity: 0.9,
        offset: [0, 0],
        markers: [
          // North America
          { location: [37.7749, -122.4194], size: 0.05 }, // San Francisco
          { location: [40.7128, -74.006], size: 0.05 }, // New York
          { location: [34.0522, -118.2437], size: 0.04 }, // Los Angeles
          { location: [41.8781, -87.6298], size: 0.04 }, // Chicago
          { location: [49.2827, -123.1207], size: 0.03 }, // Vancouver
          { location: [45.5017, -73.5673], size: 0.03 }, // Montreal
          { location: [33.749, -84.388], size: 0.03 }, // Atlanta
          { location: [47.6062, -122.3321], size: 0.04 }, // Seattle
          { location: [29.7604, -95.3698], size: 0.03 }, // Houston
          { location: [25.7617, -80.1918], size: 0.04 }, // Miami
          // Europe
          { location: [51.5074, -0.1278], size: 0.05 }, // London
          { location: [52.52, 13.405], size: 0.05 }, // Berlin
          { location: [48.8566, 2.3522], size: 0.05 }, // Paris
          { location: [41.9028, 12.4964], size: 0.04 }, // Rome
          { location: [40.4168, -3.7038], size: 0.04 }, // Madrid
          { location: [52.3676, 4.9041], size: 0.04 }, // Amsterdam
          { location: [59.3293, 18.0686], size: 0.03 }, // Stockholm
          { location: [55.6761, 12.5683], size: 0.03 }, // Copenhagen
          { location: [50.0755, 14.4378], size: 0.03 }, // Prague
          { location: [48.2082, 16.3738], size: 0.03 }, // Vienna
          // Asia
          { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
          { location: [31.2304, 121.4737], size: 0.05 }, // Shanghai
          { location: [22.3193, 114.1694], size: 0.04 }, // Hong Kong
          { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
          { location: [37.5665, 126.978], size: 0.05 }, // Seoul
          { location: [39.9042, 116.4074], size: 0.04 }, // Beijing
          { location: [19.076, 72.8777], size: 0.04 }, // Mumbai
          { location: [28.6139, 77.209], size: 0.04 }, // New Delhi
          { location: [13.7563, 100.5018], size: 0.03 }, // Bangkok
          { location: [14.5995, 120.9842], size: 0.03 }, // Manila
          { location: [3.139, 101.6869], size: 0.03 }, // Kuala Lumpur
          { location: [-6.2088, 106.8456], size: 0.04 }, // Jakarta
          { location: [25.2048, 55.2708], size: 0.04 }, // Dubai
          { location: [32.0853, 34.7818], size: 0.03 }, // Tel Aviv
          // South America
          { location: [-23.5505, -46.6333], size: 0.05 }, // Sao Paulo
          { location: [-34.6037, -58.3816], size: 0.04 }, // Buenos Aires
          { location: [-22.9068, -43.1729], size: 0.04 }, // Rio
          { location: [-33.4489, -70.6693], size: 0.03 }, // Santiago
          { location: [4.711, -74.0721], size: 0.03 }, // Bogota
          { location: [-12.0464, -77.0428], size: 0.03 }, // Lima
          { location: [19.4326, -99.1332], size: 0.04 }, // Mexico City
          // Oceania
          { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
          { location: [-37.8136, 144.9631], size: 0.04 }, // Melbourne
          { location: [-36.8485, 174.7633], size: 0.03 }, // Auckland
          // Africa
          { location: [-33.9249, 18.4241], size: 0.04 }, // Cape Town
          { location: [6.5244, 3.3792], size: 0.03 }, // Lagos
          { location: [-1.2921, 36.8219], size: 0.03 }, // Nairobi
          { location: [30.0444, 31.2357], size: 0.04 }, // Cairo
          { location: [33.5731, -7.5898], size: 0.03 }, // Casablanca
        ],
        onRender: (state: Record<string, number>) => {
          if (!isDragging.current) {
            phiRef.current += autoRotateSpeed;
          }
          state.phi = phiRef.current;
          state.theta = thetaRef.current;
        },
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      canvas.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMouseX.current;
        const deltaY = e.clientY - lastMouseY.current;
        const rotationSpeed = 0.005;

        phiRef.current += deltaX * rotationSpeed;
        thetaRef.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
        );

        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    const onMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false;
        canvas.style.cursor = "grab";
      }
    };

    initGlobe();

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const handleResize = () => {
      initGlobe();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [
    theta,
    dark,
    scale,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor,
    markerColor,
    glowColor,
    size,
  ]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        className="relative z-10"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: "block",
          cursor: "grab",
        }}
      />
    </div>
  );
}
