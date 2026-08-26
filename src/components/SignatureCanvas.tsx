import React, { useRef, useEffect, useState, useCallback } from "react";
import { RotateCcw, PenTool, Check } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
}

interface SignatureCanvasProps {
  onSignatureChange: (dataUrl: string | null) => void;
  className?: string;
  initialDataUrl?: string | null;
}

export default function SignatureCanvas({
  onSignatureChange,
  className = "",
  initialDataUrl = null,
}: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawing = useRef(false);
  const strokesRef = useRef<Stroke[]>([]);
  const currentStrokeRef = useRef<Point[]>([]);
  const [hasSignature, setHasSignature] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);

  // Redraw all strokes based on container size
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.max(window.devicePixelRatio || 1, 2);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#F9B934"; // AVW Signature Gold
    ctx.lineWidth = 2.5;

    // If we have vector strokes stored
    if (strokesRef.current.length > 0) {
      for (const stroke of strokesRef.current) {
        if (stroke.points.length === 0) continue;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          const pt = stroke.points[i];
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }
    } else if (initialDataUrl && !hasSignature) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        setHasSignature(true);
      };
      img.src = initialDataUrl;
    }
  }, [hasSignature, initialDataUrl]);

  useEffect(() => {
    redrawCanvas();

    const handleResize = () => {
      redrawCanvas();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [redrawCanvas]);

  const getCoordinates = (
    e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
  ): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0] || (e as TouchEvent).changedTouches?.[0];
      if (!touch) return { x: 0, y: 0 };
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: (e as MouseEvent).clientX - rect.left,
        y: (e as MouseEvent).clientY - rect.top,
      };
    }
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    // Prevent scrolling or zooming on mobile touch devices while drawing
    if ("touches" in e) {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isDrawing.current = true;
    const pt = getCoordinates(e.nativeEvent);
    currentStrokeRef.current = [pt];

    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing.current) return;
    if ("touches" in e) {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pt = getCoordinates(e.nativeEvent);
    currentStrokeRef.current.push(pt);

    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();

    if (!hasSignature) {
      setHasSignature(true);
    }
  };

  const stopDrawing = (
    e?: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing.current) return;
    if (e && "touches" in e && e.cancelable) {
      e.preventDefault();
    }
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.closePath();
    }

    if (currentStrokeRef.current.length > 0) {
      strokesRef.current.push({ points: [...currentStrokeRef.current] });
      currentStrokeRef.current = [];
    }

    setStrokeCount((prev) => prev + 1);
    const dataUrl = canvas.toDataURL("image/png");
    onSignatureChange(dataUrl);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    strokesRef.current = [];
    currentStrokeRef.current = [];
    setHasSignature(false);
    setStrokeCount(0);
    onSignatureChange(null);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full h-40 sm:h-48 md:h-52 bg-[#0C0C0C] border border-white/15 rounded-2xl overflow-hidden shadow-inner flex flex-col justify-between select-none touch-none"
      >
        {/* Subtle Signature Baseline and Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#f9b934_0.75px,transparent_0.75px)] [background-size:16px_16px]" />

        <div className="absolute bottom-8 sm:bottom-10 inset-x-4 sm:inset-x-8 border-b border-white/10 pointer-events-none flex justify-between items-end pb-1">
          <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.2em] text-white/30 truncate max-w-[65%]">
            [ DIGITAL SIGNATURE RECORD LINE ]
          </span>
          <span className="font-mono text-[7px] sm:text-[8px] text-accent/50 font-bold uppercase tracking-widest shrink-0">
            AVW VERIFIED
          </span>
        </div>

        {/* Placeholder Guide if Empty */}
        {!hasSignature && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-3 sm:p-4">
            <PenTool className="w-4 h-4 sm:w-5 sm:h-5 text-accent/40 mb-1.5 sm:mb-2 animate-pulse" />
            <p className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-white/50">
              Sign here using finger, stylus or mouse
            </p>
            <span className="font-mono text-[7px] sm:text-[8px] tracking-widest text-white/30 uppercase mt-0.5 sm:mt-1">
              Touch-optimized • Smooth high-DPI vector record
            </span>
          </div>
        )}

        {/* The interactive canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
          className="w-full h-full cursor-crosshair relative z-10 block touch-none"
        />

        {/* Bottom Floating Control Bar */}
        <div className="absolute bottom-2 right-2 z-20 flex items-center gap-2">
          {hasSignature && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-accent/15 border border-accent/30 rounded-full text-[8px] font-mono text-accent font-bold uppercase tracking-wider">
              <Check className="w-3 h-3" />
              <span>RECORDED</span>
            </div>
          )}
          <button
            type="button"
            onClick={clearCanvas}
            className="flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] bg-black/80 hover:bg-white hover:text-black text-white/70 rounded-full border border-white/10 text-[9px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md active:scale-95"
          >
            <RotateCcw className="w-3 h-3" />
            <span>CLEAR</span>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono text-white/40 px-1">
        <span className="truncate max-w-[60%]">Authorised representative signature</span>
        <span>{hasSignature ? `${strokeCount} stroke(s) captured` : "Awaiting signature"}</span>
      </div>
    </div>
  );
}
